import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../client';

@Injectable()
export class ParticipantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ParticipantCreateInput) {
    return this.prisma.participant.create({
      data,
    });
  }

  async getTotal(eventId: string) {
    return this.prisma.participant.count({ where: { eventId } });
  }

  async findOne(where: Prisma.ParticipantWhereInput) {
    return this.prisma.participant.findFirst({
      where,
    });
  }
}
