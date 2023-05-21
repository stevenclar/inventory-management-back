import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductOwnershipMiddleware } from './product-ownership.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProductOwnershipMiddleware)
      .forRoutes(
        { path: '*/products/:id', method: RequestMethod.DELETE },
        { path: '*/products/:id', method: RequestMethod.PATCH },
      );
  }
}
