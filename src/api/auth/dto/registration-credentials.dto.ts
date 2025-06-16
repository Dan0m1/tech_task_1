import { IsEmail, IsString } from 'class-validator';

export class RegistrationCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
