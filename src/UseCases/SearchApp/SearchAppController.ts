import { SearchApp } from "./SearchApp";
import { Request, Response } from "express";

export class SearchAppController {
  constructor(private _searchApp: SearchApp) {}

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      let apps = await this._searchApp.execute({
        Title: request.query.Title.toString(),
        Entity_Id: request.query.Entity_Id.toString(),
        Description: "",
        _id: "",
        Status: null,
        Token_Expire: 0,
      });
      return response.status(200).send({
        Message: "Aplications",
        Ok: true,
        Obj: apps,
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
