import { RegistryUserApp } from "./RegistryUserApp";
import { Request, Response } from "express";

export class RegistryUserAppController {
  constructor(private _registryUserApp: RegistryUserApp) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const filter = request.body;
    try {
      let userApps = await this._registryUserApp.execulte(filter);
      return response.status(200).send({
        Message: "User Aplication",
        Ok: true,
        obj: userApps,
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
