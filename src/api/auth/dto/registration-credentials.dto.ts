import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationCredentialsDto {
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

  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  email: string;
}
