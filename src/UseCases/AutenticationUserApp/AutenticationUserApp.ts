import { Aplicacao } from "./../../models/Aplicacao";
import { App_Usuario } from "./../../models/App_Usuario";
import { RedisService } from "./../../services/RedisService";
import { IAuthRepository } from "../../repositories/IAuthRepository";
import { Auth } from "../../models/Auth";
import { IStatementRepository } from "../../repositories/IStatementRepository";

var jwt = require("jsonwebtoken");

export class AutenticationUserApp {
  constructor(
    private _authRepo: IAuthRepository,
    private _redisService: RedisService,
    private _stateRepo: IStatementRepository
  ) {}

  async execulte(auth: Auth, tokenApp: string): Promise<Object> {
    try {
      // Find User App
      let user_app: App_Usuario = await this._authRepo.FindUserApp(auth);
      // Find App
      let app: Aplicacao = await this._authRepo.FindAppByToken(tokenApp);
      // App is existis in user
      if (
        user_app.Aplicacoes_Cadastradas.indexOf(app._id.toHexString()) <= -1
      ) {
        throw new Error("The user is not registered for this application");
      }
      // Generate Token
      if (app != null && user_app != null) {
        const token = jwt.sign({ tokenApp }, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });
        let dbName: string = await this._stateRepo.GetDatabaseNameByEntityId(
          app.Entidade_Id
        );
        await this._redisService.SaveTokenAutenticateUserApp(
          token,
          app,
          dbName,
          user_app.Auth_Usuario
        );
        return {
          Obj: {
            Nome: user_app.Nome,
            Documento: user_app.Documento,
            Email: user_app.Email,
            Aplicacao: {
              Titulo: app.Titulo,
              Descricao: app.Descricao,
              Status: app.Status,
              Dt_Criacao: app.Dt_Create,
              Token_App: app.Token_App,
            },
          },
          Token: token,
        };
      } else {
        throw new Error("No applications found with this user");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
