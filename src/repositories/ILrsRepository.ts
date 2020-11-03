import { Lrs_Usuario } from "../models/Lrs_Usuario";

export interface ILrsRepository {
    SaveNewUserLrs(entity: Lrs_Usuario): Promise<Lrs_Usuario>
    SearchUserLrs(filter: Object): Promise<Lrs_Usuario[]>
    UpdateUserLrs(id:string,update:Object):Promise<Lrs_Usuario>
}