import { Request, Response } from "express";
import { AutenticationApp } from "./AutenticationApp";

export class AutenticationAppController {
  constructor(
    private _autenticationAppService: AutenticationApp
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const auth = request.body;
    try {
      const result = await this._autenticationAppService.execulte(
        auth
      );
      return response.status(200).send({
        Ok: true,
        Message: "Authenticated application valid for 2 hours",
        result,
      });
    } catch (err) {
      console.log(err.message);
      return response.status(400).send({
        Error: err.message,
      });
    }
  }
}
