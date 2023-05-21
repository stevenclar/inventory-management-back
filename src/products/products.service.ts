import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: CreateProductDto): Promise<Product> {
    return this.productRepository.save(this.productRepository.create(product));
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Product[]> {
    return this.productRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Product>): Promise<NullableType<Product>> {
    return this.productRepository.findOne({
      where: fields,
    });
  }

  update(id: number, payload: DeepPartial<Product>): Promise<Product> {
    return this.productRepository.save(
      this.productRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.productRepository.softDelete(id);
  }
}
