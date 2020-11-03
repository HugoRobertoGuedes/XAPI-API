import { UpdateUserLrs } from "./UpdateUserLrs";
import { Request, Response } from "express";

export class UpdateUserLrsController{
    constructor(private _UpdateUserLrs:UpdateUserLrs){}

    async handler(request:Request,response:Response):Promise<Response>{
        const form_user = request.body;
        const id = request.params.id;
        try {
            let userLrs = await this._UpdateUserLrs.execute(form_user,id);
            return response.status(200).send({
                Message:"User Lrs updated",
                Ok:true,
                Obj:userLrs
            });
        } catch (error) {
            return response.status(401).send({
                Message: error.message,
                Ok: false,
                Obj: {},
              });
        }
    }
}