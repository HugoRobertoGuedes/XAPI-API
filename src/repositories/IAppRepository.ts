import { Aplicacao } from "../models/Aplicacao";
import { App_Usuario } from "../models/App_Usuario";

export interface IAppRepository {
  RegistryNewApp(app: Aplicacao): Promise<Aplicacao>;
  SearchApps(filter: Object): Promise<Aplicacao[]>;
  RegistryNewUserApp(app: App_Usuario): Promise<App_Usuario>;
  SearchUserApps(filter: Object): Promise<App_Usuario[]>;
}
