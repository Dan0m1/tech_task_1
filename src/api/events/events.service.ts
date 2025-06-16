import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsRepository } from '../../data/repositories/events.repository';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryAllEventsDto } from './dto/query-all-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async create(author: UserEntity, data: CreateEventDto) {
    return this.eventsRepository.create({
      ...data,
      Author: {
        connect: {
          id: author.id,
        },
      },
    });
  }

  async getAll(query: QueryAllEventsDto) {
    return this.eventsRepository.findMany(query);
  }

  async getAllWhereUserIsParticipating(userId: string) {
    return this.eventsRepository.findByParticipants([userId]);
  }

  async getOneById(id: string) {
    return this.eventsRepository.findOne({ id });
  }

  async update(initiator: UserEntity, eventId: string, data: UpdateEventDto) {
    await this.validateUserEventAuthorship(eventId, initiator.id);

    return this.eventsRepository.update(eventId, data);
  }

  async delete(initiator: UserEntity, eventId: string) {
    await this.validateUserEventAuthorship(eventId, initiator.id);

    return this.eventsRepository.delete(eventId);
  }

  private async validateUserEventAuthorship(eventId: string, userId: string) {
    const event = await this.eventsRepository.findOne({
      id: eventId,
      authorId: userId,
    });

    if (!event) {
      throw new BadRequestException();
    }
  }
}
