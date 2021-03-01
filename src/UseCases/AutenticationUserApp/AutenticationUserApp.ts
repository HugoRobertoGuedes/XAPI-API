import { Application } from "../../models/Application";
import { Applications_Users } from "../../models/Applications_Users";
import { RedisService } from "./../../services/RedisService";
import { IAuthRepository } from "../../repositories/IAuthRepository";
import { Auth } from "../../models/Auth";
import { IStatementRepository } from "../../repositories/IStatementRepository";
import { encrypt } from "../../helpers/Security";

var jwt = require("jsonwebtoken");

export class AutenticationUserApp {
  constructor(
    private _authRepo: IAuthRepository,
    private _redisService: RedisService,
    private _stateRepo: IStatementRepository
  ) {}

  async execulte(auth: Auth, tokenApp: string, ip: string): Promise<Object> {
    try {
      // Find User App
      let user_app: Applications_Users = await this._authRepo.FindUserApp({
        user: auth.user,
        pass: encrypt(auth.pass),
      });

      // Find App
      let app: Application = await this._authRepo.FindAppByToken(tokenApp);

      if (app != null && user_app != null) {
        // App is existis in user
        if (
          user_app.Registered_Applications.indexOf(app._id.toHexString()) <= -1
        ) {
          throw new Error("The user is not registered for this application");
        }
        // Generate Token
        if (app != null && user_app != null) {
          const token = jwt.sign({ tokenApp }, process.env.SECRET_KEY, {
            expiresIn: "2h",
          });
          let dbName: string = await this._stateRepo.GetDatabaseNameByEntityId(
            app.Entity_Id
          );
          await this._redisService.SaveTokenAutenticateUserApp(
            token,
            app,
            dbName,
            user_app.Auth_User,
            ip
          );
          return {
            Nome: user_app.Name,
            Documento: user_app.Document,
            Email: user_app.Mail,
            Aplicacao: {
              Titulo: app.Title,
              Descricao: app.Description,
              Status: app.Status,
              Dt_Criacao: app.Dt_Create,
              Token_App: app.Token_App,
            },
            Token: token,
          };
        } else {
          // Save log to ip attempt
          await this._redisService.SaveIpattemptAuth(ip, new Date(), false);
          // Error
          throw new Error("No applications found with this user");
        }
      } else {
        // Save log to ip attempt
        await this._redisService.SaveIpattemptAuth(ip, new Date(), false);
        // Error
        throw new Error("Application not found/user not found");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
