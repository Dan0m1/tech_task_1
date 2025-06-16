import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { User } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { TokensDto } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@User() user: UserEntity) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: RegistrationCredentialsDto): Promise<TokensDto> {
    return this.authService.register(body);
  }
}
