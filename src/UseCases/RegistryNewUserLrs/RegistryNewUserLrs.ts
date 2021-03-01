import { ObjectId, ObjectID } from "mongodb";
import { IEntityRepository } from "./../../repositories/IEntityRepository";
import { Lrs_User } from "../../models/Lrs_User";
import { Lrs_UsersDTO } from "../../models/DTO/Lrs_UsersDTO";
import { ILrsRepository } from "../../repositories/ILrsRepository";
import { EmailRegex } from "../../helpers/String";
import { encrypt } from "../../helpers/Security";

const { TYPE_USER } = require("../../config");

export class RegistryNewUserLrs {
  constructor(
    private _ILrsRepository: ILrsRepository,
    private _IEntityRepository: IEntityRepository
  ) {}

  async execulte(user: Lrs_UsersDTO): Promise<Lrs_User> {
    // is valid
    await this.ValidNewUser(user);

    // Generate pass
    let randomPass = Math.random().toString(36).substring(7);
    let authPass = encrypt(randomPass);
    
    // Model Lrs_Usuario
    let newUser: Lrs_User = {
        FullName: user.FullName,
        Mail: user.Mail,
        Phone: user.Phone,
        Status: true,
        Type: user.Type,
        Id_Entity: new ObjectId(user.Id_Entity),
        Dt_Att: new Date(),
        Dt_Create: new Date(),
        User: user.Mail,
        Pass: authPass
    }

    // Save
    newUser = await this._ILrsRepository.SaveNewUserLrs(newUser);
    
    // Return
    newUser["SenhaUsuario"] = randomPass;
    return newUser;
  }

  async ValidNewUser(user: Lrs_UsersDTO): Promise<void> {
    let userlrs: Lrs_User[] = []

    // Is null
    if (user.FullName == null || user.FullName == "") throw new Error("Full Name not is null");
    if (user.Mail == null || user.Mail == "") throw new Error("Email not is null");
    if (user.Phone == null || user.Phone == "") throw new Error("Telefone not is null");
    if (user.Pass == null || user.Pass == "") throw new Error("Senha not is null");
    if (user.Type == null || user.Type == "") throw new Error("Tipo not is  null");
    if (user.Id_Entity == null || user.Id_Entity == "") throw new Error("Id_Entidade not is null");

    // Exists Email?
    userlrs = await this._ILrsRepository.SearchUserLrs({"Email": user.Mail});
    if (userlrs.length > 0) throw new Error("Email already exists")

    // Regex Email
    if (!EmailRegex.test(user.Mail)) throw new Error("Email is not valid");

    // entity id is valid
    if(!ObjectID.isValid(user.Id_Entity)) throw new Error("Id_Entidade is not valid")

    // Exists Entity Id
    let entity = await this._IEntityRepository.FindEntityFilter({
      _id: new ObjectId(user.Id_Entity),
    });
    if (entity.length <= 0) throw new Error("Entity not found");

    // Type exists
    if (TYPE_USER.indexOf(user.Type) === -1) throw new Error("This type not exists");
  }
}
