import { ObjectID } from "mongodb";
import { ApplicationDTO } from "../../models/DTO/ApplicationDTO";
import { IAppRepository } from "./../../repositories/IAppRepository";
import { Application } from "../../models/Application";

export class SearchApp {
  constructor(private _iAppRepo: IAppRepository) {}
  async execute(filter: ApplicationDTO): Promise<Application[]> {
    let $or: Object[] = [];
    if (
      filter.Title != "" &&
      filter.Title != undefined &&
      filter.Title != null
    ) {
      $or.push({
        Title:
          filter.Title == ""
            ? ""
            : new RegExp(".*" + filter.Title + ".*", "i"),
      });
    }
    if (
      filter.Entity_Id != "" &&
      filter.Entity_Id != undefined &&
      filter.Entity_Id != null
    ) {
      $or.push({
        Entity_Id:
          filter.Entity_Id == "" ? "" : new ObjectID(filter.Entity_Id),
      });
    }
    let apps = await this._iAppRepo.SearchApps($or.length > 0 ? { $or } : {});
    return apps;
  }
}
