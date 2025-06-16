import { forwardRef, Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { ParticipantsModule } from '../participants/participants.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
  imports: [forwardRef(() => ParticipantsModule)],
})
export class EventsModule {}
