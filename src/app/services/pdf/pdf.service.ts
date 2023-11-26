import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {}

  /**
  * Genera un PDF usando jsPDF.
  * @param content - El string de datos a ingresar.
  * @param fileName - El nombre del archivo.
  */
  generatePdf(content: string, fileName: string): void {
    const pdf = new jsPDF('p', 'in', 'a4');

    var textLines: ""
    textLines = pdf.setFont('Arial').setFontSize(12).splitTextToSize(content, 7.25);

    let verticalOffset = 0.5;
    pdf.text(textLines, 0.5, verticalOffset + 12 / 72)
    verticalOffset += (textLines.length + 0.5) * 12 / 72;

    pdf.save(`${fileName}.pdf`);
  }
}
