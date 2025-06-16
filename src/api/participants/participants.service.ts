import { BadRequestException, Injectable } from '@nestjs/common';
import { ParticipantsRepository } from '../../data/repositories/participants.repository';
import { EventsRepository } from '../../data/repositories/events.repository';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantsRepository: ParticipantsRepository,
    private readonly eventsService: EventsRepository,
  ) {}

  async createRelation(userId: string, eventId: string) {
    const event = await this.eventsService.findOne({ id: eventId });

    if (!event) {
      throw new BadRequestException("Event doesn't exist");
    }

    const ifUserAlreadyParticipates = await this.participantsRepository.findOne(
      {
        userId,
        eventId,
      },
    );

    if (ifUserAlreadyParticipates) {
      throw new BadRequestException('User already participates');
    }

    const totalEventParticipants =
      await this.participantsRepository.getTotal(eventId);

    if (totalEventParticipants >= event.maxParticipants) {
      throw new BadRequestException('Event is full');
    }

    return this.participantsRepository.create({
      User: {
        connect: {
          id: userId,
        },
      },
      Event: {
        connect: {
          id: eventId,
        },
      },
    });
  }
}
