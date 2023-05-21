import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
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
    productWhereOptions?: FindOptionsWhere<Product>,
  ): Promise<Product[]> {
    const findManyOptions: FindManyOptions<Product> = {
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    };
    if (productWhereOptions) {
      findManyOptions.where = productWhereOptions;
    }
    return this.productRepository.find(findManyOptions);
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
