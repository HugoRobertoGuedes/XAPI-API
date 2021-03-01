import { ReportRepository } from './../../repositories/MongoDB/ReportRepository';
import { SearchReport } from './SearchReport';
import { SearchReportController } from './SearchReportController';
const reportRepository = new ReportRepository();
const searchReport = new SearchReport(reportRepository);
const searchReportController = new SearchReportController(searchReport)

export {searchReport, searchReportController}