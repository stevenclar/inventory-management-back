import { Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import { Roboto } from 'src/utils/fonts';

@Injectable()
export class PdfService {
  private printer: PdfPrinter;
  constructor() {
    const fontDescriptors = {
      Roboto,
    };
    this.printer = new PdfPrinter(fontDescriptors);
  }

  async createPdf(docDefinition: any): Promise<Buffer> {
    const pdfDoc = this.printer.createPdfKitDocument(docDefinition);

    return new Promise((resolve, reject) => {
      try {
        const chunks: Uint8Array[] = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  async createPdfBase64(docDefinition: any): Promise<string> {
    const pdfBuffer = await this.createPdf(docDefinition);
    return pdfBuffer.toString('base64');
  }
}
