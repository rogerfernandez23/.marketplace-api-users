import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ITokens } from './jwt-tokens.interface';
import { config } from 'dotenv';
config();

@Injectable()
export class JwtTokens {
  constructor(private jwtService: JwtService) {}

  async generatedTokens(payload: JwtPayload): Promise<ITokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_JWT,
      expiresIn: 60,
    });

    return { access: accessToken };
  }
}
