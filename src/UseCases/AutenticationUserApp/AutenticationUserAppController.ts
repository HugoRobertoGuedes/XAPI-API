import { AutenticationUserApp } from "./AutenticationUserApp";
import { Request, Response } from "express";

export class AutenticationUserAppController {
  constructor(private _autenticationUserAppService: AutenticationUserApp) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user, pass, tokenApp } = request.body;
    try {
      let ip =
        request.clientIp ||
        request.headers["x-forwarded-for"] ||
        request.connection.remoteAddress;
      const Obj = await this._autenticationUserAppService.execulte(
        { user, pass },
        tokenApp,
        ip.toString()
      );
      return response.status(200).send({
        Ok: true,
        Message: "Authenticated application valid for 2 hours",
        Obj,
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
