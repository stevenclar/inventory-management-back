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
  Req,
  Response,
  NotFoundException,
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
import { companyDocDefinition } from 'src/utils/doc-definitions';
import { MailDataAttachment } from 'src/mail/interfaces/mail-data.interface';
import { PdfService } from 'src/pdf/pdf.service';
import { MailService } from 'src/mail/mail.service';

@ApiTags('Company')
@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly pdfService: PdfService,
    private readonly mailService: MailService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.admin, RoleEnum.user)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createProfileDto);
  }

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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('mine')
  @HttpCode(HttpStatus.OK)
  async getMyCompanies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() req,
  ): Promise<InfinityPaginationResultType<Company>> {
    if (limit > 50) {
      limit = 50;
    }

    const where = {
      user: {
        id: req.user?.id,
      },
    };

    return infinityPagination(
      await this.companiesService.findManyWithPagination(
        {
          page,
          limit,
        },
        where,
      ),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') nit: string): Promise<NullableType<Company>> {
    return this.companiesService.findOne({ nit });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.admin, RoleEnum.user)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') nit: string,
    @Body() updateProfileDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(nit, updateProfileDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.admin, RoleEnum.user)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') nit: string): Promise<void> {
    return this.companiesService.softDelete(nit);
  }

  @Get(':id/download')
  // @Header('Content-Type', 'application/pdf')
  @HttpCode(HttpStatus.OK)
  async downloadInventory(@Param('nit') nit: string, @Response() response) {
    const company = await this.companiesService.findOne({ nit });
    if (company) {
      const pdfBuffer = await this.pdfService.createPdf(
        companyDocDefinition(company),
      );
      response.send(pdfBuffer);
    } else {
      return new NotFoundException('Company not found');
    }
  }

  @Get('send-pdf/:id/:email')
  @HttpCode(HttpStatus.OK)
  async testSendEmail(
    @Param('nit') nit: string,
    @Param('email') email: string,
  ) {
    const company = await this.companiesService.findOne({ nit });
    if (company) {
      const pdfBase64 = await this.pdfService.createPdfBase64(
        companyDocDefinition(company),
      );

      const attachments: MailDataAttachment[] = [
        {
          filename: 'inventory.pdf',
          content: pdfBase64,
          encoding: 'base64',
        },
      ];

      await this.mailService.sendAttachmentsFiles({
        to: email,
        data: { attachments },
      });
      return { message: 'Email sent' };
    }
    return new NotFoundException('Company not found');
  }
}
