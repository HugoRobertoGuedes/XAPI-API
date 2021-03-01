import { GenerateExcel } from "./GenerateExcel";
import { Response, Request } from "express";

export class GenerateExcelController {
  constructor(private _generateExcel: GenerateExcel) {}

  async handler(request: Request, response: Response): Promise<any> {
    const form = request.body;
    try {
      const app = await this._generateExcel.execulte(form);
      return response.download(app);
    } catch (error) {
      return response.status(401).send({
        Message: error.message,
        Ok: false,
        Obj: {},
      });
    }
  }
}
