import { Request, Response } from "express";
import { AutenticationApp } from "./AutenticationApp";

export class AutenticationAppController {
  constructor(
    private _autenticationAppService: AutenticationApp
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const auth = request.body;
    try {
      const Obj = await this._autenticationAppService.execulte(
        auth
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
