// Coming from npm install xlsx. It is already installed and added in package.json file. This is used to read and write excel files.

import XLSX from "xlsx";


export class ExcelHelper {
  // Excel helper methods

  static readExcelFile(filePath: string, sheetName: string): Record<string, string>[][] {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Record<string, string>[][];
    return data;
  }
}