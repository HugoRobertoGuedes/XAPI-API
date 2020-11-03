import { Response, Request } from "express";
import { SearchStatement } from "./SearchStatement";
import { BearerTokenHeader } from "../../helpers/String";
export class SearchStatementController {
  constructor(private _serachStatement: SearchStatement) {}

  async handler(request: Request, response: Response,): Promise<Response> {
    const filter = request.body;
    const token = BearerTokenHeader(request.headers["authorization"]);
    try {
      const statements = await this._serachStatement.execute(filter,token);
      return response.status(200).send({
        Message: "Statements",
        Ok: true,
        Obj: statements,
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
