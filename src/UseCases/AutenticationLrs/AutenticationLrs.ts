import { Auth } from "../../models/Auth";
import { IAuthRepository } from "../../repositories/IAuthRepository";
import { RedisService } from "../../services/RedisService";

var jwt = require("jsonwebtoken");

export class AutenticationLrs {
  constructor(
    private _authRepo: IAuthRepository,
    private _redisService: RedisService
  ) {}

  async execulte(auth: Auth, tokenExpire: number): Promise<Object> {
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
        let _tokenString = (
          userLrs.NomeCompleto +
          userLrs.NomeUsuario +
          userLrs.SenhaUsuario
        )
          .normalize("NFD")
          .replace(/[^a-zA-Zs]/g, "");

        // DELETE
        console.log(_tokenString);

        const token = jwt.sign({ _tokenString }, process.env.SECRET_KEY, {
          expiresIn: tokenExpire,
        });
        await this._redisService.SaveTokenAutenticateLrs(
          token,
          auth,
          tokenExpire
        );
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
      } else {
        throw new Error("User doens't exists");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
