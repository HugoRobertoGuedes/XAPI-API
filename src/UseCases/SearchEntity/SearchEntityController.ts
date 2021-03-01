import { SearchEntity } from "./SearchEntity";
import { Response, Request } from "express";

export class SearchEntityCOntroller {
  constructor(private _searchEntity: SearchEntity) {}

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      const listEntities = await this._searchEntity.execute({
        Name: (request.query.name) ? request.query.name.toString() : '',
        Document: (request.query.documento) ? request.query.documento.toString() : '',
        Mail: (request.query.mail) ? request.query.mail.toString() : '',
        Phone: (request.query.phone) ? request.query.phone.toString() : '',
        _id: '',
        Status: null,
      });
      return response.status(200).send({
        Message: "Entities",
        Ok: true,
        Obj: listEntities,
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
