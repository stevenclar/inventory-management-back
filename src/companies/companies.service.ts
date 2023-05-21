import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/companies.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  create(company: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.save(this.companyRepository.create(company));
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
    productWhereOptions?: FindOptionsWhere<Company>,
  ): Promise<Company[]> {
    const findManyOptions: FindManyOptions<Company> = {
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    };
    if (productWhereOptions) {
      findManyOptions.where = productWhereOptions;
    }
    return this.companyRepository.find(findManyOptions);
  }

  findOne(fields: EntityCondition<Company>): Promise<NullableType<Company>> {
    return this.companyRepository.findOne({
      where: fields,
    });
  }

  update(nit: string, payload: DeepPartial<Company>): Promise<Company> {
    return this.companyRepository.save(
      this.companyRepository.create({
        nit,
        ...payload,
      }),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.companyRepository.softDelete(id);
  }
}
