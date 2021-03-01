import { Entity } from "./../../models/Entity";
import { EntityDto } from "../../models/DTO/EntityDTO";
import { CpfRegex, EmailRegex } from "../../helpers/String";
import { IEntityRepository } from "../../repositories/IEntityRepository";

export class RegistryNewEntity {
  constructor(private _EntityRepo: IEntityRepository) {}

  async execulte(data: EntityDto): Promise<Object> {
    // valid fields
    await this.IsValid(data);
    // Generate Entity Model
    let entity: Entity = {
      Name: data.Name,
      Mail: data.Mail,
      Phone: data.Phone,
      Document: data.Document,
      Dt_Create: new Date(),
      Dt_Att: new Date(),
      Status: true,
      Db_Name:
        "Xapi_Db_" +
        data.Name.toLowerCase()
          .normalize("NFD")
          .replace(/[^a-zA-Zs]/g, ""),
    };
    // Save
    let _newEntity = await this._EntityRepo.SaveNewEntity(entity);
    // return
    return _newEntity;
  }

  async IsValid(entity: EntityDto): Promise<void> {
    // Valid Email
    if (
      !EmailRegex.test(entity.Mail) ||
      entity.Mail == null ||
      entity.Mail == ""
    ) {
      throw new Error("Enter a valid email");
    }
    // // Valid Documento
    if (
      !CpfRegex.test(entity.Document) ||
      entity.Document == null ||
      entity.Document == ""
    ) {
      throw new Error("Enter a valid CPF/CNPJ");
    }
    // // Valid Phone
    if (
      entity.Phone.length < 10 ||
      entity.Phone.length > 11 ||
      entity.Phone == null ||
      entity.Phone == ""
    ) {
      throw new Error("Enter a valid phone");
    }
    // // equal by CPF
    if (
      (
        await this._EntityRepo.FindEntityFilter({
          Document: entity.Document,
        })
      ).length != 0
    ) {
      throw new Error("A document already exists");
    }
    // // equal by Email
    if (
      (
        await this._EntityRepo.FindEntityFilter({
          Mail: entity.Mail,
        })
      ).length != 0
    ) {
      throw new Error("A Email already exists");
    }
    // // equal by Nome
    if (entity.Name == null || entity.Name == "") {
      throw new Error("Enter a valid Nome");
    }
    if (
      (await this._EntityRepo.FindEntityFilter({ Name: entity.Name })).length !=
      0
    ) {
      throw new Error("A Nome already exists");
    }
  }
}
