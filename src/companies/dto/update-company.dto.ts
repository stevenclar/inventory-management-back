import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty({ example: '573133333333' })
  @IsOptional()
  phone: string | null;

  @ApiProperty({ example: 'MyCompany' })
  @IsOptional()
  name: string | null;

  @ApiProperty({ example: 'Calle falsa #123' })
  @IsOptional()
  address: string | null;

  @ApiProperty({
    example: 'my description about the company',
  })
  @IsOptional()
  description: string | null;
}
