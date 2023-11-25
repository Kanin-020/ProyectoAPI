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
    const pdf = new jsPDF();
    pdf.text(content, 10, 10); 
    pdf.save(`${fileName}.pdf`);
  }
}

/**
 * constructor(private pdfService: PdfService) {}

  generatePdf(): void {
    const documentDefinition = {
      content: [
        { text: 'Hello, this is a PDF document!', fontSize: 14, bold: true },
        // Add more content as needed
      ],
    };
    this.pdfService.generatePdf(documentDefinition, 'example.pdf');
  }
 */
