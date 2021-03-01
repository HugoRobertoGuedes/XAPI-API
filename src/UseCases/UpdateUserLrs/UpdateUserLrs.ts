import { ILrsRepository } from "./../../repositories/ILrsRepository";
import { Lrs_User } from "../../models/Lrs_User";
import { ObjectId } from "mongodb";
import { Lrs_UsersDTO } from "../../models/DTO/Lrs_UsersDTO";
import { EmailRegex } from "../../helpers/String";
const { TYPE_USER } = require("../../config");

export class UpdateUserLrs {
  constructor(private _ILrsRepo: ILrsRepository) {}

  async execute(user: Lrs_UsersDTO, id: string): Promise<Lrs_User> {
    await this.ValidUserUpdate(user, id);

    var updatedUser = await this._ILrsRepo
      .SearchUserLrs({ _id: new ObjectId(id) })
      .then(
        (users: Lrs_User[]): Lrs_User => {
          return users[0];
        }
      );
    let $set = {
      Mail: user.Mail,
      FullName: user.FullName,
      User: user.Mail,
      Type: user.Type,
      Phone: user.Phone,
      Status: user.Status,
    };

    let updatedUserDb = await this._ILrsRepo.UpdateUserLrs(id, { $set });
    return updatedUserDb;
  }

  async ValidUserUpdate(user: Lrs_UsersDTO, id: string) {
    let userlrs: Lrs_User[] = [];

    //null
    if (user.FullName == null || user.FullName == "")
      throw new Error("Nome Completo not is null");
    if (user.Mail == null || user.Mail == "")
      throw new Error("Email not is null");
    if (user.Phone == null || user.Phone == "")
      throw new Error("Telefone not is null");
    if (user.Type == null || user.Type == "")
      throw new Error("Tipo not is  null");
    if (user.Status == null) throw new Error("Status not is  null");

    // Exisits Email?
    userlrs = await this._ILrsRepo.SearchUserLrs({
      $and: [{ Mail: user.Mail }, { _id: { $ne: new ObjectId(id) } }],
    });
    if (userlrs.length > 0) throw new Error("Email already exists");

    // Regex Email
    if (!EmailRegex.test(user.Mail)) throw new Error("Email is not valid");

    // Type exists
    if (TYPE_USER.indexOf(user.Type) === -1)
      throw new Error("This type not exists");
  }
}
