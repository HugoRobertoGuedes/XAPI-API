import { Request, Response } from "express";
import { AutenticationApp } from "./AutenticationApp";

export class AutenticationAppController {
  constructor(
    private _autenticationAppService: AutenticationApp
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const auth = request.body;
    try {
      let ip =
      request.clientIp ||
      request.headers["x-forwarded-for"] ||
      request.connection.remoteAddress;
      const Obj = await this._autenticationAppService.execulte(
        auth,
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
