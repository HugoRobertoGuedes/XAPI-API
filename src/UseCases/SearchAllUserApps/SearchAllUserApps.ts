import { IAppRepository } from "../../repositories/IAppRepository";
import { Applications_Users } from "../../models/Applications_Users";
import { Applications_UsersDTO } from "../../models/DTO/Applications_UsersDTO";
export class SearchAllUserApps {
  constructor(private _IAppRepo: IAppRepository) {}

  async execute(filter: Applications_UsersDTO): Promise<Applications_Users[]> {
    let $or: Object[] = [];
    if (filter.Name != "" && filter.Name != null) {
      $or.push({
        Name:
          filter.Name == "" ? "" : new RegExp(".*" + filter.Name + ".*", "i"),
      });
    }
    if (filter.Document != "" && filter.Document != null) {
      $or.push({
        Document:
          filter.Document == ""
            ? ""
            : new RegExp(".*" + filter.Document + ".*", "i"),
      });
    }
    if (filter.Mail != "" && filter.Mail != null) {
      $or.push({
        Mail:
          filter.Mail == "" ? "" : new RegExp(".*" + filter.Mail + ".*", "i"),
      });
    }
    if (
      filter.Registered_Applications != null &&
      filter.Registered_Applications.length > 0
    ) {
      $or.push({
        Registered_Applications:
          filter.Registered_Applications.length <= 0
            ? []
            : filter.Registered_Applications,
      });
    }
    let users = await this._IAppRepo.SearchUserApps(
      $or.length > 0 ? { $or } : {}
    );
    return users;
  }
}
