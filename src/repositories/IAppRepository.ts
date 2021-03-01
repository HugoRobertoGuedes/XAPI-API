import { Application } from "../models/Application";
import { Applications_Users } from "../models/Applications_Users";

export interface IAppRepository {
  AppUpdate(_id: string, updt_app: Object[]): Application | PromiseLike<Application>;
  RegistryNewApp(app: Application): Promise<Application>;
  SearchApps(filter: Object): Promise<Application[]>;
  RegistryNewUserApp(app: Applications_Users): Promise<Applications_Users>;
  SearchUserApps(filter: Object): Promise<Applications_Users[]>;
}
