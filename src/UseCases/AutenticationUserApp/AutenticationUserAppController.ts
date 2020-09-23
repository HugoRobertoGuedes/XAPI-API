import { AutenticationUserApp } from "./AutenticationUserApp";
import { Request, Response } from "express";

export class AutenticationUserAppController {
  constructor(private _autenticationUserAppService: AutenticationUserApp) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user, pass, tokenApp } = request.body;
    try {
      const result = await this._autenticationUserAppService.execulte(
        { user, pass },
        tokenApp
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
