import { EntityDto } from "./../../models/DTO/EntityDTO";
import { IEntityRepository } from "../../repositories/IEntityRepository";
import { Entity } from "../../models/Entity";
import { ObjectId } from "mongodb";
import { CpfRegex, EmailRegex } from "../../helpers/String";

export class UpdateEntity {
  constructor(private _EntityRepo: IEntityRepository) {}

  async execulte(data_updt: EntityDto): Promise<Entity> {
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
    if (data_updt.Documento != null && data_updt.Documento !== "") {
      // Valid Documento
      if (
        !CpfRegex.test(data_updt.Documento) ||
        data_updt.Documento == null ||
        data_updt.Documento == ""
      ) {
        throw new Error("Enter a valid CPF/CNPJ");
      }
      //  equal by CPF
      if (
        (
          await this._EntityRepo.FindEntityFilter({
            Documento: data_updt.Documento,
          })
        ).length != 0
      ) {
        throw new Error("A document already exists");
      }
      updt_entity.push({ $set: { Documento: data_updt.Documento } });
    }

    if (data_updt.Nome != null && data_updt.Nome !== "") {
      // equal by Nome
      if (data_updt.Nome == null || data_updt.Nome == "") {
        throw new Error("Enter a valid Nome");
      }
      if (
        (await this._EntityRepo.FindEntityFilter({ Nome: data_updt.Nome }))
          .length != 0
      ) {
        throw new Error("A Nome already exists");
      }
      updt_entity.push({ $set: { Nome: data_updt.Nome } });
    }

    if (data_updt.Email != null && data_updt.Email !== "") {
      // Valid Email
      if (
        !EmailRegex.test(data_updt.Email) ||
        data_updt.Email == null ||
        data_updt.Email == ""
      ) {
        throw new Error("Enter a valid email");
      }
      if (
        (
          await this._EntityRepo.FindEntityFilter({
            Email: data_updt.Email,
          })
        ).length != 0
      ) {
        throw new Error("A Email already exists");
      }
      updt_entity.push({ $set: { Email: data_updt.Email } });
    }

    if (data_updt.Telefone != null && data_updt.Telefone !== "") {
      if (
        data_updt.Telefone.length < 10 ||
        data_updt.Telefone.length > 11 ||
        data_updt.Telefone == null ||
        data_updt.Telefone == ""
      ) {
        throw new Error("Enter a valid phone");
      }
      updt_entity.push({ $set: { Telefone: data_updt.Telefone } });
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
