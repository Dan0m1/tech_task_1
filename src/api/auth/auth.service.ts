import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as crypto from 'bcryptjs';
import { TokensDto } from './dto/tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfigService } from '../../config/security-config.service';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly securityConfigService: SecurityConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getOneCredentials(username);

    if (!user || !password || !user.password) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await crypto.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      username: username,
    };
  }

  login(user: any): TokensDto {
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      createdAt: new Date(),
    };

    return this.getJwtTokens(payload);
  }

  async register(user: RegistrationCredentialsDto) {
    if (await this.checkIfUserExists(user.username)) {
      throw new UnauthorizedException('User with this username already exists');
    }
    const createDto: CreateUserDto = {
      ...user,
      password: await this.hashPassword(user.password),
    };
    const newUser = await this.usersService.create(createDto);
    return this.login(newUser);
  }

  async hashPassword(password: string) {
    const salt = await crypto.genSalt(10);
    return crypto.hash(password, salt);
  }

  async checkIfUserExists(username: string) {
    return this.usersService.getOneCredentials(username);
  }

  getJwtTokens(payload: any): TokensDto {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.securityConfigService.jwtRefreshTtl,
      }),
    };
  }
}
