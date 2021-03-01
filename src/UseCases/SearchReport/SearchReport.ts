import { ReportDTO } from "../../models/DTO/ReportDTO";
import { Report } from "../../models/Report";
import { IReportRepository } from "../../repositories/IReportRepository";

export class SearchReport {
  constructor(private readonly _IReportRepository: IReportRepository) {}

  async execute(filter: ReportDTO): Promise<Report[]> {
    let $or: Object[] = [];
    if (
      filter.Title != "" &&
      filter.Title != undefined &&
      filter.Title != null
    ) {
      $or.push({
        Title:
          filter.Title == "" ? "" : new RegExp(".*" + filter.Title + ".*", "i"),
      });
    }
    if (
      filter.Id_Report != "" &&
      filter.Id_Report != undefined &&
      filter.Id_Report != null
    ) {
      $or.push({
        Id_Report:
          filter.Id_Report == ""
            ? ""
            : new RegExp(".*" + filter.Id_Report + ".*", "i"),
      });
    }
    if (
      filter.Id_Workspace != "" &&
      filter.Id_Workspace != undefined &&
      filter.Id_Workspace != null
    ) {
      $or.push({
        Id_Workspace:
          filter.Id_Workspace == ""
            ? ""
            : new RegExp(".*" + filter.Id_Workspace + ".*", "i"),
      });
    }
    if (
      filter.AppToken != "" &&
      filter.AppToken != undefined &&
      filter.AppToken != null
    ) {
      $or.push({
        AppToken:
          filter.AppToken == ""
            ? ""
            : new RegExp(".*" + filter.AppToken + ".*", "i"),
      });
    }
    // search 
    let reports: Report[] = await this._IReportRepository.SearchReportByFilter($or.length > 0 ? { $or } : {});
    return reports;
  }
}
