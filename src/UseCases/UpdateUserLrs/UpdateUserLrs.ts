import {ILrsRepository} from "./../../repositories/ILrsRepository"
import {Lrs_Usuario} from "./../../models/Lrs_Usuario"
import { ObjectId } from "mongodb";
import { LrsUserDto } from "../../models/DTO/LrsUserDto";
import { EmailRegex } from "../../helpers/String";
const { TYPE_USER } = require("../../config");

export class UpdateUserLrs{
    constructor(private _ILrsRepo:ILrsRepository){}

    async execute(user:LrsUserDto, id:string):Promise<Lrs_Usuario>{
        await this.ValidUserUpdate(user,id)
        

        var updatedUser = await this._ILrsRepo.SearchUserLrs({_id:new ObjectId(id)}).then((users:Lrs_Usuario[]):Lrs_Usuario=>{
            return users[0];
        });
        let $set = {
            Email : user.Email,
            NomeCompleto : user.NomeCompleto,
            NomeUsuario : user.Email,
            Tipo :user.Tipo,
            Telefone : user.Telefone,
            Status:user.Status
        }
        

        let updatedUserDb = await this._ILrsRepo.UpdateUserLrs(id,{$set})
        return updatedUserDb;
    }

    async ValidUserUpdate(user: LrsUserDto,id:string) {
        let userlrs: Lrs_Usuario[] = []
        
        //null
        if (user.NomeCompleto == null || user.NomeCompleto == "") throw new Error("Nome Completo not is null");
        if (user.Email == null || user.Email == "") throw new Error("Email not is null");
        if (user.Telefone == null || user.Telefone == "") throw new Error("Telefone not is null");
        if (user.Tipo == null || user.Tipo == "") throw new Error("Tipo not is  null");
        if (user.Tipo == null || user.Tipo == "") throw new Error("Tipo not is  null");
        if (user.Status==null) throw new Error("Status not is  null");

        // Exisits Email?
        userlrs = await this._ILrsRepo.SearchUserLrs({$and:[{"Email": user.Email},{_id:{$ne:new ObjectId(id)}}]});
        if (userlrs.length > 0) throw new Error("Email already exists")

        // Regex Email
        if (!EmailRegex.test(user.Email)) throw new Error("Email is not valid");

        // Type exists
        if (TYPE_USER.indexOf(user.Tipo) === -1) throw new Error("This type not exists");
    }
    
}