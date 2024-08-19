import { UsersRepository } from './../../users/repositories/users.repository';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Users } from 'src/modules/users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { config } from 'dotenv';
config();

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersRepository: UsersRepository) {
    super({
      secretOrKey: process.env.SECRET_JWT,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<Users> {
    const { email } = payload;
    const user = await this.usersRepository.repository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException('token invalid!');
    }

    return user;
  }
}
