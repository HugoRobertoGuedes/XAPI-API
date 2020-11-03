import {ILrsRepository} from "./../../repositories/ILrsRepository"
import {Lrs_Usuario} from "./../../models/Lrs_Usuario"
import { ObjectId } from "mongodb";

export class SearchUserLrs{
    constructor(private _ILrsRepo:ILrsRepository){}

    async execute(id:string):Promise<Lrs_Usuario[]>{
        if(id==null||id==""){
            throw new Error("Inform ID Entity")
        }
        
        let users = await this._ILrsRepo.SearchUserLrs({Id_Entidade:new ObjectId(id)});
        return users;
    }
}