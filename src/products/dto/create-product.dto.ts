import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'myProduct' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'my description about the product' })
  description: string | null;

  @ApiProperty({ example: '10000' })
  @IsNotEmpty()
  price: number | null;

  @ApiProperty({ example: 'Unit' })
  @IsNotEmpty()
  measure: string | null;
}
