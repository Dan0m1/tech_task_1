import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventsRepository } from './repositories/events.repository';
import { UsersRepository } from './repositories/users.repository';
import { ParticipantsRepository } from './repositories/participants.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    ParticipantsRepository,
    EventsRepository,
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ParticipantsRepository,
    EventsRepository,
  ],
})
export class DataModule {}
