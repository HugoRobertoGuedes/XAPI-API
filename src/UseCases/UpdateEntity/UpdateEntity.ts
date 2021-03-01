import { EntityDto } from "./../../models/DTO/EntityDTO";
import { IEntityRepository } from "../../repositories/IEntityRepository";
import { Entity } from "../../models/Entity";
import { ObjectId } from "mongodb";
import { CpfRegex, EmailRegex } from "../../helpers/String";

export class UpdateEntity {
  constructor(private _EntityRepo: IEntityRepository) {}

  async execute(data_updt: EntityDto): Promise<Entity> {
    // if exists entity
    if (data_updt._id == null || data_updt._id == "") {
      throw new Error("_id is required");
    }

    let exists = await this._EntityRepo.FindEntityFilter({
      _id: new ObjectId(data_updt._id),
    });
    if (exists == null || exists.length <= 0) {
      throw new Error("Entity not found");
    }

    // Object updates entity
    let updt_entity: Object[] = [];

    // set fields entity updates
    if (data_updt.Document != null && data_updt.Document !== "") {
      // Valid Documento
      if (
        !CpfRegex.test(data_updt.Document) ||
        data_updt.Document == null ||
        data_updt.Document == ""
      ) {
        throw new Error("Enter a valid CPF/CNPJ");
      }
      //  equal by CPF
      if (
        (
          await this._EntityRepo.FindEntityFilter({
            Document: data_updt.Document,
          })
        ).length != 0
      ) {
        throw new Error("A document already exists");
      }
      updt_entity.push({ $set: { Document: data_updt.Document } });
    }

    if (data_updt.Name != null && data_updt.Name !== "") {
      // equal by Nome
      if (data_updt.Name == null || data_updt.Name == "") {
        throw new Error("Enter a valid Nome");
      }
      if (
        (await this._EntityRepo.FindEntityFilter({ Name: data_updt.Name }))
          .length != 0
      ) {
        throw new Error("A Nome already exists");
      }
      updt_entity.push({ $set: { Name: data_updt.Name } });
    }

    if (data_updt.Mail != null && data_updt.Mail !== "") {
      // Valid Email
      if (
        !EmailRegex.test(data_updt.Mail) ||
        data_updt.Mail == null ||
        data_updt.Mail == ""
      ) {
        throw new Error("Enter a valid email");
      }
      if (
        (
          await this._EntityRepo.FindEntityFilter({
            Mail: data_updt.Mail,
          })
        ).length != 0
      ) {
        throw new Error("A Mail already exists");
      }
      updt_entity.push({ $set: { Mail: data_updt.Mail } });
    }

    if (data_updt.Phone != null && data_updt.Phone !== "") {
      if (
        data_updt.Phone.length < 10 ||
        data_updt.Phone.length > 11 ||
        data_updt.Phone == null ||
        data_updt.Phone == ""
      ) {
        throw new Error("Enter a valid phone");
      }
      updt_entity.push({ $set: { Phone: data_updt.Phone } });
    }

    if (data_updt.Status != null) {
      updt_entity.push({ $set: { Status: data_updt.Status } });
    }

    // set data att
    updt_entity.push({ $set: { Dt_Att: new Date() } });

    const entity: Entity = await this._EntityRepo.EntityUpdate(
      data_updt._id,
      updt_entity
    );
    return entity;
  }
}
