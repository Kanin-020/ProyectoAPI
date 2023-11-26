import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() {}

  /**
  * Genera un Excel usando XLSX.
  * @param data - El array de datos a ingresar.
  * @param sheetName - El nombre de la hoja de trabajo.
  * @param fileName - El nombre del archivo.
  */
  generateExcel(data: any[], sheetName: string, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}

