import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/companies.entity';
import { CompaniesController } from './companies.controller';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CompanyOwnershipMiddleware } from './company-ownership.middleware';
import { MailModule } from 'src/mail/mail.module';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  imports: [MailModule, PdfModule, TypeOrmModule.forFeature([Company])],
  providers: [IsNotExist, CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CompanyOwnershipMiddleware)
      .forRoutes(
        { path: '*/companies/:id', method: RequestMethod.DELETE },
        { path: '*/companies/:id', method: RequestMethod.PATCH },
      );
  }
}
