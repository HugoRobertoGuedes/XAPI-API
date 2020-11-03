import { SearchEntity } from "./SearchEntity";
import { Response, Request } from "express";

export class SearchEntityCOntroller {
  constructor(private _searchEntity: SearchEntity) {}

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      const listEntities = await this._searchEntity.execute({
        Nome: request.query.nome.toString(),
        Documento: request.query.documento.toString(),
        Email: request.query.email.toString(),
        Telefone: request.query.telefone.toString(),
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
