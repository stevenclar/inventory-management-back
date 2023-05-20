import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/companies.entity';
import { CompaniesController } from './companies.controller';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [IsNotExist, CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
