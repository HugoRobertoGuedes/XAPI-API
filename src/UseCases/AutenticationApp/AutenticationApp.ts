import { RedisService } from "./../../services/RedisService";
import { IAuthRepository } from "../../repositories/IAuthRepository";
import { Auth } from "../../models/Auth";
import { Aplicacao } from "../../models/Aplicacao";
import { IStatementRepository } from "../../repositories/IStatementRepository";
import { encrypt } from "../../helpers/Security";

var jwt = require("jsonwebtoken");

export class AutenticationApp {
  constructor(
    private _authRepo: IAuthRepository,
    private _redisService: RedisService,
    private _stateRepo: IStatementRepository
  ) {}

  async execulte(auth: Auth, ip: string): Promise<Object> {
    try {
      // Find App
      let app: Aplicacao = await this._authRepo.FindAppByAuth({
        user: auth.user,
        pass: encrypt(auth.pass)
      });
      if (app != null) {
        let tokenApp = app.Token_App;
        const token = jwt.sign({ tokenApp }, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });
        let dbName: string = await this._stateRepo.GetDatabaseNameByEntityId(
          app.Entidade_Id
        );
        await this._redisService.SaveTokenAutenticateApp(token, app, dbName, ip);
        return {
          Titulo: app.Titulo,
          Descricao: app.Descricao,
          Status: app.Status,
          Dt_Criacao: app.Dt_Create,
          Token_App: app.Token_App,
          Token: token,
        };
      } else {
        // Save log to ip attempt
        await this._redisService.SaveIpattemptAuth(ip, new Date(), false);
        // Error
        throw new Error("No applications found with this user");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
