import { SearchAllUserApps } from "./SearchAllUserApps";
import { Response, Request } from "express";

export class SearchAllUserAppsAppController {
  constructor(private _searchAllUserApp: SearchAllUserApps) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const filter = request.body;
    try {
      const statements = await this._searchAllUserApp.execute(filter);
      return response.status(200).send({
        Message: "All User Apps",
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
