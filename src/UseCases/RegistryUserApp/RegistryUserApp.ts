import { Aplicacao } from "./../../models/Aplicacao";
import { IAppRepository } from "./../../repositories/IAppRepository";
import { ObjectID } from "mongodb";
import { App_Usuario } from "./../../models/App_Usuario";
import { App_UsuarioDto } from "../../models/DTO/App_UsuarioDto";
import { encrypt } from "../../helpers/Security";
import { CpfRegex, EmailRegex } from "../../helpers/String";

export class RegistryUserApp {
  constructor(private _iAppRepo: IAppRepository) {}

  async execulte(userApp: App_UsuarioDto): Promise<App_Usuario> {
    // is Valid?
    await this.ValidUserApp(userApp);

    // Generate Auth
    let authUser = userApp.Nome.trim().toLowerCase();
    let randomPass = Math.random().toString(36).substring(16);
    let authPass = encrypt(randomPass);

    // Generate Model
    let user = new App_Usuario({
      Nome: userApp.Nome,
      Email: userApp.Email,
      Documento: userApp.Documento,
      Aplicacoes_Cadastradas: userApp.Aplicacoes_Cadastradas,
      Auth_Usuario: {
        user: authUser,
        pass: authPass,
      },
      Dt_Att: new Date(),
      Dt_Create: new Date(),
      Status: true,
      Usuario_Criacao_Id: new ObjectID(userApp.Usuario_Criacao_Id),
    });
    user = await this._iAppRepo.RegistryNewUserApp(user);
    return user;
  }

  async ValidUserApp(user: App_UsuarioDto): Promise<void> {
    // Is null and Regex
    if (user.Nome == null || user.Nome == "") {
      throw new Error("Insert valid Nome");
    }
    if (
      user.Email == null ||
      user.Email == "" ||
      !EmailRegex.test(user.Email)
    ) {
      throw new Error("Insert valid Email");
    }
    if (user.Documento == null || user.Documento == "") {
      throw new Error("Insert valid Documento");
    }
    // Exists email
    if (
      (await this._iAppRepo.SearchUserApps({ Email: user.Email })).length > 0
    ) {
      throw new Error("Email is already in use");
    }
    // Document
    if (
      (await this._iAppRepo.SearchUserApps({ Documento: user.Documento }))
        .length > 0
    ) {
      throw new Error("Document is already in use");
    }
    // Apps is valid
    const appIsActive = user.Aplicacoes_Cadastradas.map(async (id) => {
      let app: Aplicacao[] = await this._iAppRepo.SearchApps({
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
        throw new Error(`The Application { ${el.Titulo} } is disabled`);
      }
    });
  }
}
