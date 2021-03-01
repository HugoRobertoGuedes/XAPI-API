"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationApp = void 0;
const Security_1 = require("../../helpers/Security");
var jwt = require("jsonwebtoken");
class AutenticationApp {
    constructor(_authRepo, _redisService, _stateRepo) {
        this._authRepo = _authRepo;
        this._redisService = _redisService;
        this._stateRepo = _stateRepo;
    }
    async execulte(auth, ip) {
        try {
            // Find App
            let app = await this._authRepo.FindAppByAuth({
                user: auth.user,
                pass: Security_1.encrypt(auth.pass)
            });
            if (app != null) {
                let tokenApp = app.Token_App;
                const token = jwt.sign({ tokenApp }, process.env.SECRET_KEY, {
                    expiresIn: "2h",
                });
                let dbName = await this._stateRepo.GetDatabaseNameByEntityId(app.Entity_Id);
                await this._redisService.SaveTokenAutenticateApp(token, app, dbName, ip);
                return {
                    Titulo: app.Title,
                    Descricao: app.Description,
                    Status: app.Status,
                    Dt_Criacao: app.Dt_Create,
                    Token_App: app.Token_App,
                    Token: token,
                };
            }
            else {
                // Save log to ip attempt
                await this._redisService.SaveIpattemptAuth(ip, new Date(), false);
                // Error
                throw new Error("No applications found with this user");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.AutenticationApp = AutenticationApp;
