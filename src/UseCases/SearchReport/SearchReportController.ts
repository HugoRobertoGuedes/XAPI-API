import { SearchReport } from "./SearchReport";
import { Request, Response } from "express";

export class SearchReportController {
  constructor(private _SearchReport: SearchReport) {}

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      let reports = await this._SearchReport.execute({
        Type: "",
        Title: (request.query.Title) ? request.query.Title.toString() :  '',
        Description:"",
        Id_Report: (request.query.Id_Report) ? request.query.Id_Report.toString() :  '',
        Id_Workspace: (request.query.Id_Workspace) ? request.query.Id_Workspace.toString() : '',
        IsRole: null,
        Roles: null,
        AppToken: (request.query.AppToken) ? request.query.AppToken.toString() : '',
      });
      return response.status(200).send({
        Message: "Reports",
        Ok: true,
        Obj: reports,
      });
    } catch (err) {
      return response.status(401).send({
        Message: err.message,
        Ok: false,
        Obj: {},
      });
    }
  }
}
