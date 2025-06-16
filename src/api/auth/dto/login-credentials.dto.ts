import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginCredentialsDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsString()
  password: string;
}
