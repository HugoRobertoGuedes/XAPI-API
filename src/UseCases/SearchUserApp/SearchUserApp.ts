import { IAppRepository } from "./../../repositories/IAppRepository";
import { App_Usuario } from "./../../models/App_Usuario";
import { App_UsuarioDto } from "../../models/DTO/App_UsuarioDto";
export class SearchUserApp {
  constructor(private _IAppRepo: IAppRepository) {}

  async execulte(id: string): Promise<App_Usuario[]> {
    if (id == null || id == "") {
      throw new Error("Inform ID app");
    }
    let users = await this._IAppRepo.SearchUserApps({ Aplicacoes_Cadastradas: id});
    return users;
  }
}
