import { Auth } from "../models/Auth";
import { Application } from "../models/Application";
import { Applications_Users } from "../models/Applications_Users";
import { Lrs_User } from "../models/Lrs_User";

export interface IAuthRepository {
  FindAppByAuth(auth: Auth): Promise<Application>;
  FindUserApp(auth: Auth): Promise<Applications_Users>;
  FindAppByToken(token: string): Promise<Application>;
  FindUserlrsByAuth(auth: Auth): Promise<Lrs_User>;
}
