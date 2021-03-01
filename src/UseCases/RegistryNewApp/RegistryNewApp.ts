import { IAppRepository } from "./../../repositories/IAppRepository";
import { ObjectID } from "mongodb";
import { IEntityRepository } from "./../../repositories/IEntityRepository";
import { ApplicationDTO } from "../../models/DTO/ApplicationDTO";
import { Application } from "../../models/Application";
import { encrypt } from "../../helpers/Security";
import sha256 from "sha256";
export class RegistryNewApp {
  constructor(
    private _iEntityRepo: IEntityRepository,
    private _iAppRepo: IAppRepository
  ) {}

  async execulte(data: ApplicationDTO): Promise<Application> {
    // is Valid
    await this.ValidApp(data);

    // Generate model
    // Gerando dados adicionais
    let authUser = data.Title.toLowerCase()
      .normalize("NFD")
      .replace(/[^a-zA-Zs]/g, "");
    let randomPass = Math.random().toString(36).substring(7);
    let authPass = encrypt(randomPass);
    let tokenApp = sha256(data.Title);

    const app = new Application({
      Title: data.Title,
      Description: data.Description,
      Entity_Id: new ObjectID(data.Entity_Id),
      Dt_Att: new Date(),
      Dt_Create: new Date(),
      Status: true,
      Auth_User: {
        pass: authPass,
        user: authUser,
      },
      Token_Expire: data.Token_Expire,
      Token_App: tokenApp,
    });

    let newApp = await this._iAppRepo.RegistryNewApp(app);
    newApp.Auth_User.pass = randomPass;
    return newApp;
  }

  async ValidApp(app: ApplicationDTO): Promise<void> {
    // title is null
    if (app.Title == "" || app.Title == null) {
      throw new Error("Enter a valid title");
    }

    // Get Entity
    let entity = await this._iEntityRepo.FindEntityFilter({
      _id: new ObjectID(app.Entity_Id),
    });
    // If entity exists and status is true
    if (entity[0].Status == false || entity == null) {
      throw new Error("The entity is not active / Not found");
    }
  }
}
