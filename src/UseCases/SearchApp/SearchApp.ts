import { ObjectID } from "mongodb";
import { AplicacaoDto } from "../../models/DTO/AplicacaoDto";
import { IAppRepository } from "./../../repositories/IAppRepository";
import { Aplicacao } from "./../../models/Aplicacao";
import { app } from "../../app";

export class SearchApp {
  constructor(private _iAppRepo: IAppRepository) {}
  async execute(filter: AplicacaoDto): Promise<Aplicacao[]> {
    let $or: Object[] = [];
    if (filter.Titulo != "" && filter.Titulo!= undefined && filter.Titulo!= null) {
      $or.push({
        Titulo:
          filter.Titulo == ""
            ? ""
            : new RegExp(".*" + filter.Titulo + ".*", "i"),
      });
    }
    if (filter.Entidade_Id != "" && filter.Entidade_Id!= undefined  && filter.Entidade_Id!= null) {
      $or.push({
        Entidade_Id:
          filter.Entidade_Id == "" ? "" : new ObjectID(filter.Entidade_Id),
      });
    }
    let apps = await this._iAppRepo.SearchApps($or.length > 0 ? { $or } : {});
    return apps;
  }
}
