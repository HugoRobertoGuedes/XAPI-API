import { AutenticationLrs } from "./AutenticationLrs";
import { Request, Response } from "express";

export class AutenticationLrsController {
  constructor(private _autenticarLrs: AutenticationLrs) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user, pass, tokenExpire } = request.body;
      const ret = await this._autenticarLrs.execulte(
        { user, pass },
        tokenExpire
      );
      return response.status(200).send({
        Ok: true,
        Message: `Authenticated application valid for ${tokenExpire} ms`,
        ret,
      });
    } catch (err) {
      return response.status(401).send({
        Message: err.message,
        Ok: false,
        Obj: {},
      });
    }
  }
}
