import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { ParticipantsModule } from './api/participants/participants.module';
import { EventsModule } from './api/events/events.module';
import { UsersModule } from './api/users/users.module';
import { DataModule } from './data/data.module';
import { CustomConfigModule } from './config/config.module';
import configuration from './config/config-constansts';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    ParticipantsModule,
    AuthModule,
    DataModule,
    CustomConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
