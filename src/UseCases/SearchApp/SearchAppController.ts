import { SearchApp } from "./SearchApp";
import { Request, Response } from "express";

export class SearchAppController {
  constructor(private _searchApp: SearchApp) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const filter = request.body;
    try {
      let apps = await this._searchApp.execulte(filter);
      return response.status(200).send({
        Message: "Aplications",
        Ok: true,
        obj: apps,
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
