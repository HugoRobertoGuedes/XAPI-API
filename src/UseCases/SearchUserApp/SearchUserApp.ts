import { IAppRepository } from "./../../repositories/IAppRepository";
import { Applications_Users } from "../../models/Applications_Users";
export class SearchUserApp {
  constructor(private _IAppRepo: IAppRepository) {}

  async execute(id: string): Promise<Applications_Users[]> {
    if (id == null || id == "") {
      throw new Error("Inform ID app");
    }
    let users = await this._IAppRepo.SearchUserApps({ Registered_Applications: id});
    return users;
  }
}
