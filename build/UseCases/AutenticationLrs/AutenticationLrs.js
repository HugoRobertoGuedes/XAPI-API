"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationLrs = void 0;
const Security_1 = require("../../helpers/Security");
var jwt = require("jsonwebtoken");
class AutenticationLrs {
    constructor(_authRepo, _redisService) {
        this._authRepo = _authRepo;
        this._redisService = _redisService;
    }
    async execulte(auth, tokenExpire, ip) {
        try {
            // Validations
            if (auth.pass == null) {
                throw new Error("Password is required!");
            }
            if (auth.user == null) {
                throw new Error("User is required!");
            }
            // Find to database
            let userLrs = await this._authRepo.FindUserlrsByAuth({
                user: auth.user,
                pass: Security_1.encrypt(auth.pass)
            });
            // is valid
            if (userLrs != null) {
                let _tokenString = (userLrs.FullName +
                    userLrs.User +
                    userLrs.Pass)
                    .normalize("NFD")
                    .replace(/[^a-zA-Zs]/g, "");
                const token = jwt.sign({ _tokenString }, process.env.SECRET_KEY, {
                    expiresIn: tokenExpire,
                });
                await this._redisService.SaveTokenAutenticateLrs(token, ip, auth, tokenExpire);
                return {
                    NomeCompleto: userLrs.FullName,
                    NomeUsuario: userLrs.User,
                    Email: userLrs.Mail,
                    Telefone: userLrs.Phone,
                    Tipo: userLrs.Type,
                    Token: token,
                };
            }
            else {
                // Save log to ip attempt
                await this._redisService.SaveIpattemptAuth(ip, new Date(), false);
                // Error
                throw new Error("User doens't exists");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.AutenticationLrs = AutenticationLrs;
