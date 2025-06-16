import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DatabaseUtils } from '../database.utils';
import { QueryAllUsersDto } from '../../api/users/dto/query-all-users.dto';
import { Prisma } from '../client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async findMany(query: QueryAllUsersDto) {
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
      DatabaseUtils.buildFindManyArgs<Prisma.UserWhereInput>(buildArgsPayload);

    const total = await this.prisma.user.count({ where: args.where });

    const result = await this.prisma.user.findMany({
      ...args,
      omit: {
        password: true,
      },
    });

    return DatabaseUtils.convertPaginationData(
      result,
      total,
      buildArgsPayload.paginationDto,
    );
  }

  async findOne(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where,
      omit: {
        password: true,
      },
    });
  }

  async findByUsernameWithPassword(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
