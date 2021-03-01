import {ILrsRepository} from "./../../repositories/ILrsRepository"
import {Lrs_User} from "../../models/Lrs_User"
import { ObjectId } from "mongodb";

export class SearchUserLrs{
    constructor(private _ILrsRepo:ILrsRepository){}

    async execute(id:string):Promise<Lrs_User[]>{
        if(id==null||id==""){
            throw new Error("Inform ID Entity")
        }
        
        let users = await this._ILrsRepo.SearchUserLrs({Id_Entity:new ObjectId(id)});
        return users;
    }
}