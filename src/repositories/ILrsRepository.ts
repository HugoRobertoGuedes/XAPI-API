import { Lrs_User } from "../models/Lrs_User";

export interface ILrsRepository {
    SaveNewUserLrs(entity: Lrs_User): Promise<Lrs_User>
    SearchUserLrs(filter: Object): Promise<Lrs_User[]>
    UpdateUserLrs(id:string,update:Object):Promise<Lrs_User>
}