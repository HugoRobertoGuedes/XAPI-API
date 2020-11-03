import { SearchUserApp } from "./SearchUserApp";
import { Response, Request } from "express";

export class SearchUserAppController {
  constructor(private _searchUserApp: SearchUserApp) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    try {
      const statements = await this._searchUserApp.execute(id);
      return response.status(200).send({
        Message: "User Apps",
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
