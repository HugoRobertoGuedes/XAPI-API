import { AppRepository } from "../../repositories/MongoDB/AppRepository";
import { ReportRepository } from "../../repositories/MongoDB/ReportRepository";
import { RegistryNewReport } from "./RegistryNewReport";
import { RegistryNewReportController } from "./RegistryNewReportController";

const appRepository = new AppRepository();
const reportRepository = new ReportRepository();
const registryNewReport = new RegistryNewReport(reportRepository,appRepository);
const registryNewReportController = new RegistryNewReportController(registryNewReport);

export { registryNewReport, registryNewReportController}