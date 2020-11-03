import { RegistryNewUserLrs } from "./RegistryNewUserLrs";
import { Request, Response } from "express";

export class RegistryNewUserLrsController {
    constructor(private _RegistryNewUserLrs: RegistryNewUserLrs){}

    async handler(request: Request, response: Response): Promise<Response> {
        const form_user = request.body;
        try {
          let userLrs = await this._RegistryNewUserLrs.execulte(form_user);
          return response.status(200).send({
            Message: "User Lrs",
            Ok: true,
            Obj: userLrs
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