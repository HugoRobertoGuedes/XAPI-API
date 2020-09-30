import { StatementDto } from "../../models/DTO/StatementDTO";
import { Request, Response } from "express";
import { BearerTokenHeader } from "../../helpers/String";
import { RegistryNewStatement } from "./RegistryNewStatement";

export class RegistryNewStatementController {
  constructor(private _registryNewStatement: RegistryNewStatement) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const state: StatementDto = request.body;
    const token = BearerTokenHeader(request.headers["authorization"]);
    try {
      const insertedState = await this._registryNewStatement.execulte(
        state,
        token
      );
      return response.status(200).send({
        Message: "Succes Register Statement",
        Ok: true,
        obj: insertedState,
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
