import { JwtTokens } from './strategies/jwt-tokens.';
import { UsersRepository } from './../users/repositories/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { ITokens } from './strategies/jwt-tokens.interface';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './strategies/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtTokens: JwtTokens,
  ) {}

  async login(userAuthDto: UserAuthDto): Promise<ITokens> {
    const { email, password } = userAuthDto;

    const user = await this.usersRepository.repository.findOneBy({
      email: email,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };

      return await this.jwtTokens.generatedTokens(payload);
    } else {
      throw new UnauthorizedException('user or password incorrect!');
    }
  }
}
