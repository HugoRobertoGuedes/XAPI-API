import { UpdateEntity } from "./UpdateEntity";
import { Response, Request } from "express";

export class UpdateEntityController {
  constructor(private _UpdateEntity: UpdateEntity) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const form = request.body;
    try {
      const updt_entity = await this._UpdateEntity.execute(form);
      return response.status(200).send({
        Message: "Entity updated",
        Ok: true,
        Obj: updt_entity,
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
