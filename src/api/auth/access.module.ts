import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../../config/config.module';
import { SecurityConfigService } from '../../config/security-config.service';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule],
  imports: [
    PassportModule,
    CustomConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [CustomConfigModule],
      inject: [SecurityConfigService],
      useFactory: (configService: SecurityConfigService) => ({
        secret: configService.secret,
        signOptions: {
          expiresIn: configService.jwtTtl,
        },
      }),
    }),
  ],
})
export class AccessModule {}
