"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationLrs = void 0;
var jwt = require("jsonwebtoken");
class AutenticationLrs {
    constructor(_authRepo, _redisService) {
        this._authRepo = _authRepo;
        this._redisService = _redisService;
    }
    async execulte(auth, tokenExpire) {
        try {
            // Validations
            if (auth.pass == null) {
                throw new Error("Password is required!");
            }
            if (auth.user == null) {
                throw new Error("User is required!");
            }
            // Find to database
            let userLrs = await this._authRepo.FindUserlrsByAuth(auth);
            // is valid
            if (userLrs != null) {
                let _tokenString = (userLrs.NomeCompleto +
                    userLrs.NomeUsuario +
                    userLrs.SenhaUsuario)
                    .normalize("NFD")
                    .replace(/[^a-zA-Zs]/g, "");
                // DELETE
                console.log(_tokenString);
                const token = jwt.sign({ _tokenString }, process.env.SECRET_KEY, {
                    expiresIn: tokenExpire,
                });
                await this._redisService.SaveTokenAutenticateLrs(token, auth, tokenExpire);
                return {
                    Obj: {
                        NomeCompleto: userLrs.NomeCompleto,
                        NomeUsuario: userLrs.NomeUsuario,
                        Email: userLrs.Email,
                        Telefone: userLrs.Telefone,
                        Tipo: userLrs.Tipo,
                    },
                    Token: token,
                };
            }
            else {
                throw new Error("User doens't exists");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.AutenticationLrs = AutenticationLrs;
