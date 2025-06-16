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

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly participantsService: ParticipantsService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.create(user, createEventDto);
  }

  @UseGuards(JwtGuard)
  @Post('/participants/me/:eventId')
  async registerOnEvent(
    @User() user: UserEntity,
    @Param('eventId') eventId: string,
  ) {
    return this.participantsService.createRelation(user.id, eventId);
  }

  @Get()
  async getAll(@Query() query: QueryAllEventsDto) {
    return this.eventsService.getAll(query);
  }

  @UseGuards(JwtGuard)
  @Get('/participants/me')
  async getParticipatingEvents(@User() user: UserEntity) {
    return this.eventsService.getAllWhereUserIsParticipating(user.id);
  }

  @Get('/:eventId')
  async getOneById(@Param('eventId') eventId: string) {
    return this.eventsService.getOneById(eventId);
  }

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
