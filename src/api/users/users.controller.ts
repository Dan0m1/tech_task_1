import { Controller, Get, Query } from '@nestjs/common';
import { QueryAllUsersDto } from './dto/query-all-users.dto';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: implement role-based/permission-based authorization and check for the requesting right
  @ApiOperation({
    summary: 'Get all users (Should be used only for debugging purposes)',
  })
  @Get()
  async getAll(@Query() query: QueryAllUsersDto) {
    return this.usersService.getAll(query);
  }
}
