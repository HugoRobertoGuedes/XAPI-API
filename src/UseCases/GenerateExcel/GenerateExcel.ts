import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { IReportRepository } from "../../repositories/IReportRepository";

export class GenerateExcel {
  constructor(private readonly _IReportRepository: IReportRepository) {}

  async execulte(modelo: Object): Promise<string> {
    // Require library
    var xl = require("excel4node");

    // Create a new instance of a Workbook class
    var wb = new xl.Workbook();

    // Gerar as sheets
    if (modelo["sheets"].length > 0) {
      for (const [idx, element] of modelo["sheets"].entries()) {
        var ws = wb.addWorksheet(element["Name"]);
        // Buscar no banco
        const values: Object[] = await this._IReportRepository.ExeculteQuery(
          element["Query"],
          element["Database"],
          element["Collection"]
        );
        // Generate values
        if (element["FieldValues"].length > 0) {
          for (const [idxdata, database] of values.entries()) {
            1;
            for (const [idxheader, value] of element["FieldValues"].entries()) {
              // Set style header
              var style = wb.createStyle(value["headerStyle"]);

              // Set value header
              ws.cell(1, idxheader + 1)
                .string(value["HeaderName"])
                .style(style);

              // Create Value
              const cell_value: string = eval(
                `database${value["NameFieldValue"]}`
              );

              // Set values
              if (value["type"] == "string")
                ws.cell(idxdata + 1 + 1, idxheader + 1).string(
                  cell_value ? cell_value : value["defaultValue"]
                );

              if (value["type"] == "bool")
                ws.cell(idxdata + 1 + 1, idxheader + 1).bool(
                  cell_value ? true : false
                );

              if (value["type"] == "number")
                ws.cell(idxdata + 1 + 1, idxheader + 1).number(
                  cell_value ? cell_value : value["defaultValue"]
                );

              if (value["type"] == "formula")
                ws.cell(idxdata + 1 + 1, idxheader + 1).formula(
                  cell_value ? cell_value : value["defaultValue"]
                );
                
            }
          }
        }
      }
    }
    const fileName: string = `./temp/${modelo["FileName"]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-zA-Zs]/g, "")}.xlsx`;
    wb.write(fileName);
    return fileName;
  }
}
