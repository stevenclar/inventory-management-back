import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { Company } from './entities/companies.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Company')
@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles(RoleEnum.admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createProfileDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Company>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.companiesService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') nit: string): Promise<NullableType<Company>> {
    return this.companiesService.findOne({ nit });
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') nit: string,
    @Body() updateProfileDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(nit, updateProfileDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') nit: string): Promise<void> {
    return this.companiesService.softDelete(nit);
  }
}
