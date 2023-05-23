import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction } from 'express';
import { CompaniesService } from './companies.service';

@Injectable()
export class CompanyOwnershipMiddleware implements NestMiddleware {
  constructor(private readonly companyService: CompaniesService) {}

  async use(req, res, next: NextFunction) {
    if (req.params.id !== 'mine') {
      const companyId = req.params.id;
      const userId = req.user?.id;
      const company = await this.companyService.findOne({ nit: companyId });

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      if (!company.user || company.user?.id !== userId) {
        throw new NotFoundException('You are not the owner of this company');
      }
    }

    next();
  }
}
