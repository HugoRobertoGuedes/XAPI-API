import { RegistryNewApp } from "./RegistryNewApp";
import { Response, Request } from "express";

export class RegistryNewAppController {
  constructor(private _registryNewApp: RegistryNewApp) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const form = request.body;
    try {
      const app = await this._registryNewApp.execulte(form);
      return response.status(200).send({
        Message: "Aplication",
        Ok: true,
        Obj: app,
      });
    } catch (error) {
      return response.status(401).send({
        Message: error.message,
        Ok: false,
        Obj: {},
      });
    }
  }
}
