import { Module } from '@nestjs/common';
import { SecurityConfigService } from './security-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [SecurityConfigService, ConfigService],
  exports: [SecurityConfigService, ConfigService],
})
export class CustomConfigModule extends ConfigModule {}
