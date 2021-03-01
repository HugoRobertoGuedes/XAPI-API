import { encrypt } from "../../helpers/Security";
import { Auth } from "../../models/Auth";
import { IAuthRepository } from "../../repositories/IAuthRepository";
import { RedisService } from "../../services/RedisService";

var jwt = require("jsonwebtoken");

export class AutenticationLrs {
  constructor(
    private _authRepo: IAuthRepository,
    private _redisService: RedisService
  ) {}

  async execulte(auth: Auth, tokenExpire: number, ip: string): Promise<Object> {
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
        pass: encrypt(auth.pass)
      });

      // is valid
      if (userLrs != null) {
        let _tokenString = (
          userLrs.FullName +
          userLrs.User +
          userLrs.Pass
        )
          .normalize("NFD")
          .replace(/[^a-zA-Zs]/g, "");

        const token = jwt.sign({ _tokenString }, process.env.SECRET_KEY, {
          expiresIn: tokenExpire,
        });
        await this._redisService.SaveTokenAutenticateLrs(
          token,
          ip,
          auth,
          tokenExpire,
        );
        return {
          NomeCompleto: userLrs.FullName,
          NomeUsuario: userLrs.User,
          Email: userLrs.Mail,
          Telefone: userLrs.Phone,
          Tipo: userLrs.Type,
          Token: token,
        };
      } else {
        // Save log to ip attempt
        await this._redisService.SaveIpattemptAuth(ip, new Date(), false);
        // Error
        throw new Error("User doens't exists");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
