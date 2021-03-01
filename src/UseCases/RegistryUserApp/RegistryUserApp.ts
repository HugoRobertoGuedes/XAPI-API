import { Application } from "../../models/Application";
import { IAppRepository } from "./../../repositories/IAppRepository";
import { ObjectID } from "mongodb";
import { Applications_Users } from "../../models/Applications_Users";
import { Applications_UsersDTO } from "../../models/DTO/Applications_UsersDTO";
import { encrypt } from "../../helpers/Security";
import { EmailRegex } from "../../helpers/String";

export class RegistryUserApp {
  constructor(private _iAppRepo: IAppRepository) {}

  async execulte(userApp: Applications_UsersDTO): Promise<Applications_Users> {
    // is Valid?
    await this.ValidUserApp(userApp);

    // Generate Auth
    let authUser = userApp.Name.toLowerCase()
      .normalize("NFD")
      .replace(/[^a-zA-Zs]/g, "");
    let randomPass = Math.random().toString(36).substring(7);
    let authPass = encrypt(randomPass);

    // Generate Model
    let user = new Applications_Users({
      Name: userApp.Name,
      Mail: userApp.Mail,
      Document: userApp.Document,
      Registered_Applications: userApp.Registered_Applications,
      Auth_User: {
        user: authUser,
        pass: authPass,
      },
      Dt_Att: new Date(),
      Dt_Create: new Date(),
      Status: true,
      User_Create_Id: new ObjectID(userApp.User_Creation_Id),
    });
    user = await this._iAppRepo.RegistryNewUserApp(user);
    user.Auth_User.pass = randomPass;
    return user;
  }

  async ValidUserApp(user: Applications_UsersDTO): Promise<void> {
    // Is null and Regex
    if (user.Name == null || user.Name == "") {
      throw new Error("Insert valid Nome");
    }
    if (
      user.Mail == null ||
      user.Mail == "" ||
      !EmailRegex.test(user.Mail)
    ) {
      throw new Error("Insert valid Email");
    }
    if (user.Document == null || user.Document == "") {
      throw new Error("Insert valid Documento");
    }
    // Exists email
    if (
      (await this._iAppRepo.SearchUserApps({ Mail: user.Mail })).length > 0
    ) {
      throw new Error("Email is already in use");
    }
    // Document
    if (
      (await this._iAppRepo.SearchUserApps({ Document: user.Document }))
        .length > 0
    ) {
      throw new Error("Document is already in use");
    }
    // Apps is valid
    const appIsActive = user.Registered_Applications.map(async (id) => {
      let app: Application[] = await this._iAppRepo.SearchApps({
        _id: new ObjectID(id),
      });
      return app[0];
    });
    const result = await Promise.all(appIsActive);
    result.forEach((el) => {
      if (el == undefined) {
        throw new Error(`Application not found`);
      }
      if (!el.Status) {
        throw new Error(`The Application { ${el.Title} } is disabled`);
      }
    });
  }
}
