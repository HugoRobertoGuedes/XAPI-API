import { Report } from "../models/Report";

export interface IReportRepository {
    SaveNewReport(report: Report): Promise<Report>;
    SearchReportByFilter(filter: Object): Promise<Report[]>;
    ExeculteQuery(filter: Object, name_database: string, name_collection: string): Promise<Object[]>;
}