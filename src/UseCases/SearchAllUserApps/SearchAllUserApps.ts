import { IAppRepository } from "../../repositories/IAppRepository";
import { App_Usuario } from "../../models/App_Usuario";
import { App_UsuarioDto } from "../../models/DTO/App_UsuarioDto";
export class SearchAllUserApps {
  constructor(private _IAppRepo: IAppRepository) {}

  async execulte(filter: App_UsuarioDto): Promise<App_Usuario[]> {
    let $or = ([] = []);
    if (filter.Nome != "" && filter.Nome != null) {
      $or.push({
        Nome:
          filter.Nome == "" ? "" : new RegExp(".*" + filter.Nome + ".*", "i"),
      });
    }
    if (filter.Documento != "" && filter.Documento != null) {
      $or.push({
        Documento:
          filter.Documento == ""
            ? ""
            : new RegExp(".*" + filter.Documento + ".*", "i"),
      });
    }
    if (filter.Email != "" && filter.Email != null) {
      $or.push({
        Email:
          filter.Email == "" ? "" : new RegExp(".*" + filter.Email + ".*", "i"),
      });
    }
    if (
      filter.Aplicacoes_Cadastradas != null &&
      filter.Aplicacoes_Cadastradas.length > 0 
    ) {
      $or.push({
        Aplicacoes_Cadastradas:
          filter.Aplicacoes_Cadastradas.length <= 0
            ? []
            : filter.Aplicacoes_Cadastradas,
      });
    }
    let users = await this._IAppRepo.SearchUserApps(
      $or.length > 0 ? { $or } : {}
    );
    return users;
  }
}
