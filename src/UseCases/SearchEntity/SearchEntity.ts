import { EntityDto } from "../../models/DTO/EntityDTO";
import { Entity } from "./../../models/Entity";
import { IEntityRepository } from "../../repositories/IEntityRepository";

export class SearchEntity {
  constructor(private _iEntityRepository: IEntityRepository) {}

  async execute(search: EntityDto): Promise<Entity[]> {
    let $or: Object[] = [];
    
    if (search.Name != null && search.Name != "") {
      $or.push({
        Name: new RegExp(".*" + search.Name + ".*", "i"),
      });
    }

    if (search.Document != null && search.Document != "") {
      $or.push({
        Document: new RegExp(".*" + search.Document + ".*", "i"),
      });
    }

    if (search.Mail != null && search.Mail != "") {
      $or.push({
        Mail: new RegExp(".*" + search.Mail + ".*", "i"),
      });
    }

    if (search.Phone != null && search.Phone != "") {
      $or.push({
        Phone: new RegExp(".*" + search.Phone + ".*", "i"),
      });
    }
    let entities = await this._iEntityRepository.FindEntityFilter($or.length > 0 ? { $or } : {});
    return entities;
  }
}
