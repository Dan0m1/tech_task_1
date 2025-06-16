import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessModule } from './access.module';
import { UsersModule } from '../users/users.module';
import { CustomConfigModule } from '../../config/config.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [LocalStrategy, AuthService],
  imports: [PassportModule, AccessModule, UsersModule, CustomConfigModule],
})
export class AuthModule {}
