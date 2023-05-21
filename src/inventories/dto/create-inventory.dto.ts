import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { Company } from 'src/companies/entities/companies.entity';
import { Product } from 'src/products/entities/products.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateInventoryDto {
  @ApiProperty({
    example: 'my description about the inventory',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ example: '20' })
  @IsNotEmpty()
  availableQuantity: number | null;

  @ApiProperty({ type: Company })
  @Validate(IsExist, ['Company', 'nit'], {
    message: 'companyNotExists',
  })
  @IsNotEmpty()
  company: Company | null;

  @ApiProperty({ type: Product })
  @Validate(IsExist, ['Product', 'id'], {
    message: 'productNotExists',
  })
  @IsNotEmpty()
  product: Product | null;
}
