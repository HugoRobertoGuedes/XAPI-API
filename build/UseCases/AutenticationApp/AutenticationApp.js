"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationApp = void 0;
var jwt = require("jsonwebtoken");
class AutenticationApp {
    constructor(_authRepo, _redisService, _stateRepo) {
        this._authRepo = _authRepo;
        this._redisService = _redisService;
        this._stateRepo = _stateRepo;
    }
    async execulte(auth) {
        try {
            // Find App
            let app = await this._authRepo.FindAppByAuth(auth);
            let tokenApp = app.Token_App;
            if (app != null) {
                const token = jwt.sign({ tokenApp }, process.env.SECRET_KEY, {
                    expiresIn: "2h",
                });
                let dbName = await this._stateRepo.ObterNomeDatabasePorEntidadeId(app.Entidade_Id);
                await this._redisService.SaveTokenAutenticateApp(token, app, dbName);
                return {
                    Obj: {
                        Titulo: app.Titulo,
                        Descricao: app.Descricao,
                        Status: app.Status,
                        Dt_Criacao: app.Dt_Create,
                        Token_App: app.Token_App,
                    },
                    Token: token,
                };
            }
            else {
                throw new Error("No applications found with this user");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.AutenticationApp = AutenticationApp;
