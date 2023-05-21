import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction } from 'express';
import { ProductsService } from './products.service';

@Injectable()
export class ProductOwnershipMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductsService) {}

  async use(req, res, next: NextFunction) {
    const productId = req.params.id;
    const userId = req.user?.id;
    const product = await this.productService.findOne({ id: +productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!product.user || product.user?.id !== userId) {
      throw new NotFoundException('You are not the owner of this product');
    }

    next();
  }
}
