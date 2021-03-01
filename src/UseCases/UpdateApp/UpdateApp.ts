import { ObjectId } from "mongodb";
import { Application } from "../../models/Application";
import { ApplicationDTO } from "../../models/DTO/ApplicationDTO";
import { IAppRepository } from "../../repositories/IAppRepository";

export class UpdateApp {
  constructor(private _AppRepo: IAppRepository) {}
  async execute(data_updt: ApplicationDTO): Promise<Application> {
    if (data_updt._id == null || data_updt._id == "") {
      throw new Error("_id is required");
    }

    let exists = await this._AppRepo.SearchApps({
      _id: new ObjectId(data_updt._id),
    });

    if (exists == null || exists.length <= 0) {
      throw new Error("Application not found");
    }

    let updt_app: Object[] = [];

    if (data_updt.Description != null && data_updt.Description != "") {
      updt_app.push({ $set: { Description: data_updt.Description } });
    }

    if (data_updt.Status != null) {
      updt_app.push({ $set: { Status: data_updt.Status } });
    }

    if (data_updt.Title != null && data_updt.Title != "") {
      updt_app.push({ $set: { Title: data_updt.Title } });
    }

    updt_app.push({ $set: { Dt_Att: new Date() } });

    const app: Application = await this._AppRepo.AppUpdate(
      data_updt._id,
      updt_app
    );

    return app;
  }
}
