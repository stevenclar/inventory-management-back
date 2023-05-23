import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
