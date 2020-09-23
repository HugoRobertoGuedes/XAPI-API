import { Auth } from "../models/Auth";
import { Aplicacao } from "../models/Aplicacao";
import { App_Usuario } from "../models/App_Usuario";
import { Lrs_Usuario } from "../models/Lrs_Usuario";

export interface IAuthRepository {
  FindAppByAuth(auth: Auth): Promise<Aplicacao>;
  FindUserApp(auth: Auth): Promise<App_Usuario>;
  FindAppByToken(token: string): Promise<Aplicacao>;
  FindUserlrsByAuth(auth: Auth): Promise<Lrs_Usuario>;
}
