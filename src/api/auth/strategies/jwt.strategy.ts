import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtDto } from '../dto/jwt.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret', // TODO: get from config service,
    });
  }

  async validate(payload: JwtDto) {
    if (!payload) {
      throw new ForbiddenException();
    }

    const user = await this.usersService.getOneById(payload.sub);
    if (!user) {
      throw new ForbiddenException();
    }

    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
