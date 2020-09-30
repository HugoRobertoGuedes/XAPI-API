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
      Nome: data.Nome,
      Email: data.Email,
      Telefone: data.Telefone,
      Documento: data.Documento,
      Dt_Create: new Date(),
      Dt_Att: new Date(),
      Status: true,
      Db_Name:
        "Xapi_Db_" +
        data.Nome.toLowerCase()
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
      !EmailRegex.test(entity.Email) ||
      entity.Email == null ||
      entity.Email == ""
    ) {
      throw new Error("Enter a valid email");
    }
    // // Valid Documento
    if (
      !CpfRegex.test(entity.Documento) ||
      entity.Documento == null ||
      entity.Documento == ""
    ) {
      throw new Error("Enter a valid CPF/CNPJ");
    }
    // // Valid Phone
    if (
      entity.Telefone.length < 10 ||
      entity.Telefone.length > 11 ||
      entity.Telefone == null ||
      entity.Telefone == ""
    ) {
      throw new Error("Enter a valid phone");
    }
    // // equal by CPF
    if (
      (await this._EntityRepo.FindEntityFilter({
        "Documento": entity.Documento,
      })) != null
    ) {
      throw new Error("A document already exists");
    }
    // // equal by Email
    if (
      (await this._EntityRepo.FindEntityFilter({
        Email: entity.Email,
      })) != null
    ) {
      throw new Error("A Email already exists");
    }
    // // equal by Nome
    if (entity.Nome == null || entity.Nome == "") {
      throw new Error("Enter a valid Nome");
    }
    if (
      (await this._EntityRepo.FindEntityFilter({ Nome: entity.Nome })) != null
    ) {
      throw new Error("A Nome already exists");
    }
  }
}
