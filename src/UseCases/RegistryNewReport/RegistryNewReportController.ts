import { RegistryNewReport } from "./RegistryNewReport";
import { Response, Request } from "express";

export class RegistryNewReportController {
  constructor(private _RegistryNewReport: RegistryNewReport) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const form = request.body;
    try {
      const app = await this._RegistryNewReport.execulte(form);
      return response.status(200).send({
        Message: "New report successfully",
        Ok: true,
        Obj: app,
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
