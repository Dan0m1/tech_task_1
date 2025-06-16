import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../client';
import { DatabaseUtils } from '../database.utils';
import { EventWhereInput } from '../client/models/Event';
import { QueryAllEventsDto } from '../../api/events/dto/query-all-events.dto';

@Injectable()
export class EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({
      data,
    });
  }

  async findMany(query: QueryAllEventsDto) {
    const buildArgsPayload = {
      defaultSortField: 'id',
      sortDto: {
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
      },
      search: query.search,
      paginationDto: {
        page: query.page,
        pageSize: query.pageSize,
      },
    };

    const args =
      DatabaseUtils.buildFindManyArgs<Prisma.EventWhereInput>(buildArgsPayload);

    const total = await this.prisma.event.count({ where: args.where });

    const result = await this.prisma.event.findMany({
      ...args,
    });

    return DatabaseUtils.convertPaginationData(
      result,
      total,
      buildArgsPayload.paginationDto,
    );
  }

  async findByParticipants(participants: string[]) {
    return this.prisma.event.findMany({
      where: {
        Participants: {
          some: {
            userId: {
              in: participants,
            },
          },
        },
      },
    });
  }

  async findOne(where: EventWhereInput) {
    return this.prisma.event.findFirst({
      where,
    });
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return this.prisma.event.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
