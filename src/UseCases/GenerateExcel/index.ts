import { ReportRepository } from "../../repositories/MongoDB/ReportRepository";
import { GenerateExcel } from "./GenerateExcel";
import { GenerateExcelController } from "./GenerateExcelController";

const reportRepository = new ReportRepository();
const generateExcel = new GenerateExcel(reportRepository);
const generateExcelController = new GenerateExcelController(generateExcel);

export { generateExcel, generateExcelController };
