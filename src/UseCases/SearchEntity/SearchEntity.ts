import { EntityDto } from "../../models/DTO/EntityDTO";
import { Entity } from "./../../models/Entity";
import { IEntityRepository } from "../../repositories/IEntityRepository";

export class SearchEntity {
  constructor(private _iEntityRepository: IEntityRepository) {}

  async execute(search: EntityDto): Promise<Entity[]> {
    let $or: Object[] = [];
    
    if (search.Nome != null && search.Nome != "") {
      $or.push({
        Nome: new RegExp(".*" + search.Nome + ".*", "i"),
      });
    }

    if (search.Documento != null && search.Documento != "") {
      $or.push({
        Documento: new RegExp(".*" + search.Documento + ".*", "i"),
      });
    }

    if (search.Email != null && search.Email != "") {
      $or.push({
        Email: new RegExp(".*" + search.Email + ".*", "i"),
      });
    }

    if (search.Telefone != null && search.Telefone != "") {
      $or.push({
        Telefone: new RegExp(".*" + search.Telefone + ".*", "i"),
      });
    }
    let entities = await this._iEntityRepository.FindEntityFilter($or.length > 0 ? { $or } : {});
    return entities;
  }
}
