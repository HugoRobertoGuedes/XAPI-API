import { SearchApp } from "./SearchApp";
import { Request, Response } from "express";

export class SearchAppController {
  constructor(private _searchApp: SearchApp) {}

  async handler(request: Request, response: Response): Promise<Response> {
    
    console.log(request.body)
    try {
      let apps = await this._searchApp.execute({Titulo: request.query.Titulo.toString(),
      Entidade_Id: request.query.Entidade_Id.toString(),
      Descricao: '',
      Token_Expire: 0
    }​​​​​​​);
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
