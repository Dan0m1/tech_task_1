import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryAllEventsDto } from './dto/query-all-events.dto';
import { ParticipantsService } from '../participants/participants.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly participantsService: ParticipantsService,
  ) {}

  @ApiOperation({
    summary: 'Create event',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.create(user, createEventDto);
  }

  @ApiOperation({
    summary: 'Register current user on event',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/participants/me/:eventId')
  async registerOnEvent(
    @User() user: UserEntity,
    @Param('eventId') eventId: string,
  ) {
    return this.participantsService.createRelation(user.id, eventId);
  }

  @ApiOperation({
    summary: 'Get all events',
  })
  @Get()
  async getAll(@Query() query: QueryAllEventsDto) {
    return this.eventsService.getAll(query);
  }

  @ApiOperation({
    summary: 'View events where current user is participating',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('/participants/me')
  async getParticipatingEvents(@User() user: UserEntity) {
    return this.eventsService.getAllWhereUserIsParticipating(user.id);
  }

  @ApiOperation({
    summary: 'Get event by id',
  })
  @Get('/:eventId')
  async getOneById(@Param('eventId') eventId: string) {
    return this.eventsService.getOneById(eventId);
  }

  @ApiOperation({
    summary: 'Update event',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('/:eventId')
  async update(
    // TODO: consider implementing pipe layer
    @User() user: UserEntity,
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(user, eventId, updateEventDto);
  }

  @ApiOperation({
    summary: 'Delete event',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('/:eventId')
  async delete(
    // TODO: consider implementing pipe layer
    @User() user: UserEntity,
    @Param('eventId') eventId: string,
  ) {
    return this.eventsService.delete(user, eventId);
  }
}
