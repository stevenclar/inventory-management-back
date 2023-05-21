import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: '573133333333' })
  @IsOptional()
  name: string | null;

  @ApiProperty({ example: 'MyProduct' })
  @IsOptional()
  description: string | null;

  @ApiProperty({ example: '10000' })
  @IsOptional()
  price: number | null;

  @ApiProperty({ example: 'Kg' })
  @IsOptional()
  measure: string | null;
}
