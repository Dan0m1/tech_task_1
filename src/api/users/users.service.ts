import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/data/repositories/users.repository';
import { QueryAllUsersDto } from './dto/query-all-users.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    return this.usersRepository.create(data);
  }

  async getAll(query: QueryAllUsersDto) {
    return this.usersRepository.findMany(query);
  }

  async getOneById(id: string) {
    return this.usersRepository.findOne({ id });
  }

  async getOneCredentials(username: string) {
    return this.usersRepository.findByUsernameWithPassword(username);
  }
}
