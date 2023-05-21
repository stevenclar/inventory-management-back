import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { Company } from 'src/companies/entities/companies.entity';
import { Product } from 'src/products/entities/products.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class UpdateInventoryDto {
  @ApiProperty({ example: 'inventory description' })
  @IsOptional()
  description: string | null;

  @ApiProperty({ example: '10000' })
  @IsOptional()
  availableQuantity: number | null;

  @ApiProperty({ type: Company })
  @IsOptional()
  @Validate(IsExist, ['Company', 'id'], {
    message: 'roleNotExists',
  })
  company?: Company | null;

  @ApiProperty({ type: Product })
  @IsOptional()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'roleNotExists',
  })
  product?: Product | null;
}
