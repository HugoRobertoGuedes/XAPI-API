import { SearchEntity } from "./SearchEntity";
import { Response, Request } from "express";

export class SearchEntityCOntroller {
  constructor(private _searchEntity: SearchEntity) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const filter = request.body;
    try {
      const listEntitys = await this._searchEntity.execulte(filter);
      return response.status(200).send({
        Message: "Statements",
        Ok: true,
        Obj: listEntitys,
      });
    } catch (error) {
      console.log(error);
      return response.status(401).send({
        Message: error,
        Ok: false,
        Obj: {},
      });
    }
  }
}
