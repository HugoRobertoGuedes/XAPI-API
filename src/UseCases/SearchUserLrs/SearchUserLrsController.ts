import {SearchUserLrs} from "./SearchUserLrs"
import {Response,Request} from "express"

export class SearchUserLrsController{
    constructor(private _searchUserLrs:SearchUserLrs){}

    async handler(request:Request,response:Response):Promise<Response>{
        const id = request.params.id;
        try {
            const statements = await this._searchUserLrs.execute(id);
            return response.status(200).send({
                Message:"User Lrs",
                Ok: true,
                Obj: statements
            });
        } catch (error) {
            return response.status(401).send({
                Message:error.message,
                Ok: false,
                Obj: {}
            });
        }
    }
}