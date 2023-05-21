import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventories.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoriesRepository: Repository<Inventory>,
  ) {}

  create(inventories: CreateInventoryDto): Promise<Inventory> {
    return this.inventoriesRepository.save(
      this.inventoriesRepository.create(inventories),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Inventory[]> {
    return this.inventoriesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(
    fields: EntityCondition<Inventory>,
  ): Promise<NullableType<Inventory>> {
    return this.inventoriesRepository.findOne({
      where: fields,
    });
  }

  update(id: number, payload: DeepPartial<Inventory>): Promise<Inventory> {
    return this.inventoriesRepository.save(
      this.inventoriesRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.inventoriesRepository.softDelete(id);
  }
}
