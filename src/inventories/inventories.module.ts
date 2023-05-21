import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventories.entity';
import { InventoriesController } from './inventories.controller';
import { IsExist } from 'src/utils/validators/is-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  providers: [IsExist, InventoriesService],
  controllers: [InventoriesController],
})
export class InventoriesModule {}
