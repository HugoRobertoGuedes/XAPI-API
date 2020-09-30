import { EntityDto } from "../../models/DTO/EntityDTO";
import { Entity } from "./../../models/Entity";
import { IEntityRepository } from "../../repositories/IEntityRepository";

export class SearchEntity {
  constructor(private _iEntityRepository: IEntityRepository) {}

  async execulte(search: EntityDto): Promise<Entity[]> {
    let entities = await this._iEntityRepository.FindEntityFilter({
      $or: [
        {
          Nome:
            search.Nome == "" ? "" : new RegExp(".*" + search.Nome + ".*", "i"),
        },
        {
          Documento:
            search.Documento == ""
              ? ""
              : new RegExp(".*" + search.Documento + ".*", "i"),
        },
        {
          Email:
            search.Email == ""
              ? ""
              : new RegExp(".*" + search.Email + ".*", "i"),
        },
        {
          Telefone:
            search.Telefone == ""
              ? ""
              : new RegExp(".*" + search.Telefone + ".*", "i"),
        },
      ],
    });
    return entities;
  }
}
