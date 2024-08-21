import { UsersRepository } from './../../users/repositories/users.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ITokens } from './jwt-tokens.interface';
import { config } from 'dotenv';
import { Request } from 'express';
import { TokenService } from 'src/modules/tokens/token.service';
config();

@Injectable()
export class JwtTokens {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
    private tokenService: TokenService,
  ) {}

  async generatedTokens(payload: JwtPayload): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_JWT,
        expiresIn: 60,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_JWT_REFRESH,
        expiresIn: 120,
      }),
    ]);

    return { access: accessToken, refresh: refreshToken };
  }

  async validateToken(req: Request) {
    const refreshToken = req.body.refresh;

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.usersRepository.repository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const tokenExist = await this.tokenService.findOne(refreshToken);
    if (!tokenExist) {
      await this.tokenService.create(refreshToken);
    } else {
      throw new UnauthorizedException('invalid token!');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.SECRET_JWT_REFRESH,
      });

      return email;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
      }

      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('expired token');
      }

      throw new Error(err.name);
    }
  }

  async desativateToken(refreshToken: string) {
    const tokenExist = await this.tokenService.findOne(refreshToken);

    if (!tokenExist) {
      await this.tokenService.create(refreshToken);

      throw new HttpException('Reset Content', HttpStatus.RESET_CONTENT);
    } else {
      throw new UnauthorizedException('invalid token');
    }
  }
}
