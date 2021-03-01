import { updateUserLrs } from "../UpdateUserLrs";
import { UpdateApp } from "./UpdateApp";
import { Response, Request } from "express";


export class UpdateAppController{
    constructor(private _UpdateApp:UpdateApp){}

    async handler(request:Request,response:Response):Promise<Response>{
        const form = request.body

        try {
            const updt_app = await this._UpdateApp.execute(form)
            return response.status(200).send({
                Message:"App updated",
                Ok:true,
                Obj:updt_app
            })
        } catch (error) {
            return response.status(401).send({
                Message: error.message,
                Ok: false,
                Obj: {},
              });
        }
    }
}