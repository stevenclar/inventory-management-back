import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateCompanyDto {
  @ApiProperty({ example: '123456-6' })
  @Validate(IsNotExist, ['Company', 'nit', true], {
    message: 'nitAlreadyExists',
  })
  @IsNotEmpty()
  nit: string;

  @ApiProperty({ example: '573133333333' })
  @IsNotEmpty()
  phone: string | null;

  @ApiProperty({ example: 'MyCompany' })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({ example: 'Calle falsa #123' })
  @IsNotEmpty()
  address: string | null;

  user?: User | null;
}
