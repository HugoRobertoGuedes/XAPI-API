import { ObjectId, ObjectID } from "mongodb";
import { IEntityRepository } from "./../../repositories/IEntityRepository";
import { Lrs_Usuario } from "./../../models/Lrs_Usuario";
import { LrsUserDto } from "../../models/DTO/LrsUserDto";
import { ILrsRepository } from "../../repositories/ILrsRepository";
import { EmailRegex } from "../../helpers/String";
import { encrypt } from "../../helpers/Security";

const { TYPE_USER } = require("../../config");

export class RegistryNewUserLrs {
  constructor(
    private _ILrsRepository: ILrsRepository,
    private _IEntityRepository: IEntityRepository
  ) {}

  async execulte(user: LrsUserDto): Promise<Lrs_Usuario> {
    // is valid
    await this.ValidNewUser(user);

    // Generate pass
    let randomPass = Math.random().toString(36).substring(7);
    let authPass = encrypt(randomPass);
    
    // Model Lrs_Usuario
    let newUser: Lrs_Usuario = {
        NomeCompleto: user.NomeCompleto,
        Email: user.Email,
        Telefone: user.Telefone,
        Status: true,
        Tipo: user.Tipo,
        Id_Entidade: new ObjectId(user.Id_Entidade),
        Dt_Att: new Date(),
        Dt_Create: new Date(),
        NomeUsuario: user.Email,
        SenhaUsuario: authPass
    }

    // Save
    newUser = await this._ILrsRepository.SaveNewUserLrs(newUser);
    
    // Return
    newUser["SenhaUsuario"] = randomPass;
    return newUser;
  }

  async ValidNewUser(user: LrsUserDto): Promise<void> {
    let userlrs: Lrs_Usuario[] = []

    // Is null
    if (user.NomeCompleto == null || user.NomeCompleto == "") throw new Error("Nome Completo not is null");
    if (user.Email == null || user.Email == "") throw new Error("Email not is null");
    if (user.Telefone == null || user.Telefone == "") throw new Error("Telefone not is null");
    if (user.Senha == null || user.Senha == "") throw new Error("Senha not is null");
    if (user.Tipo == null || user.Tipo == "") throw new Error("Tipo not is  null");
    if (user.Id_Entidade == null || user.Id_Entidade == "") throw new Error("Id_Entidade not is null");

    // Exists Email?
    userlrs = await this._ILrsRepository.SearchUserLrs({"Email": user.Email});
    if (userlrs.length > 0) throw new Error("Email already exists")

    // Regex Email
    if (!EmailRegex.test(user.Email)) throw new Error("Email is not valid");

    // entity id is valid
    if(!ObjectID.isValid(user.Id_Entidade)) throw new Error("Id_Entidade is not valid")

    // Exists Entity Id
    let entity = await this._IEntityRepository.FindEntityFilter({
      _id: new ObjectId(user.Id_Entidade),
    });
    if (entity.length <= 0) throw new Error("Entity not found");

    // Type exists
    if (TYPE_USER.indexOf(user.Tipo) === -1) throw new Error("This type not exists");
  }
}
