import { ObjectId } from "mongodb";
import { ReportDTO } from "../../models/DTO/ReportDTO";
import { Report } from "../../models/Report";
import { IAppRepository } from "../../repositories/IAppRepository";
import { IReportRepository } from "../../repositories/IReportRepository";

export class RegistryNewReport {
  constructor(private readonly _IReportRepository: IReportRepository, private readonly _IAppRepository: IAppRepository) {}

  async execulte(new_report: ReportDTO): Promise<Report> {
    // is valid ?
    await this.IsValid(new_report);

    // Save Report and return
    let save_report: Report = {
      Type: new_report.Type,
      Title: new_report.Title,
      Description: new_report.Description,
      Dt_Att: new Date(),
      Dt_Create: new Date(),
      Id_Report: new_report.Id_Report,
      Id_Workspace: new_report.Id_Workspace,
      IsRole: new_report.IsRole,
      Roles: new_report.Roles,
      User_Created: new ObjectId(),
      AppToken: new_report.AppToken,
    };
    // Save Report and return
    save_report = await this._IReportRepository.SaveNewReport(save_report);
    return save_report;
  }

  async IsValid(report: ReportDTO): Promise<void> {
    // Check nulls
    if (!report.Type) throw new Error("Type is not null");
    if (!report.Title) throw new Error("Title is not null");
    if (!report.Id_Report) throw new Error("Id_Report is not null");
    if (!report.Description) throw new Error("Description is not null");
    if (!report.Id_Workspace) throw new Error("Id_Workspace is not null");
    // chekg is roles and roles
    if (report.IsRole) {
      if (!report.Roles) throw new Error("Roles is not null");
    }
    // Check exists app
    let app_exists = await this._IAppRepository.SearchApps({
        "Token_App": report.AppToken
    });
    if(app_exists.length < 0) throw new Error("Application not found");
    // Check exist report equal report_id
    let find_reports = await this._IReportRepository.SearchReportByFilter({
      "Id_Report": report.Id_Report,
    });
    if (find_reports.length > 0) throw new Error("Exists report to report_id");
  }
}
