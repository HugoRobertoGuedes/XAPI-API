import { EntityDto } from "./../../models/EntityDTO";
import { Response, Request } from "express";
import { RegistryNewEntity } from "./RegistryNewEntity.ts";
export class RegistryNewEntityController {
  constructor(private _RegistryNewEntity: RegistryNewEntity) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const form: EntityDto = request.body;
    try {
      let newEntity = await this._RegistryNewEntity.execulte(form);
      return response.status(200).send({
        Message: "Entity registered",
        Ok: true,
        Obj: newEntity,
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
