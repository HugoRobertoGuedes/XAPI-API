import { ObjectID } from "mongodb";
import { AplicacaoDto } from "./../../models/AplicacaoDto";
import { IAppRepository } from "./../../repositories/IAppRepository";
import { Aplicacao } from "./../../models/Aplicacao";
import { app } from "../../app";

export class SearchApp {
  constructor(private _iAppRepo: IAppRepository) {}
  async execulte(filter: AplicacaoDto): Promise<Aplicacao[]> {
    let $or = ([] = []);
    if (filter.Titulo != "") {
      $or.push({
        Titulo:
          filter.Titulo == ""
            ? ""
            : new RegExp(".*" + filter.Titulo + ".*", "i"),
      });
    }
    if (filter.Entidade_Id != "") {
      $or.push({
        Entidade_Id:
          filter.Entidade_Id == "" ? "" : new ObjectID(filter.Entidade_Id),
      });
    }
    let apps = await this._iAppRepo.SearchApps($or.length > 0 ? { $or } : {});
    return apps;
  }
}
