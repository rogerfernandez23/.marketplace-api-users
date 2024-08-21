import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/tokens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async create(refreshToken: string) {
    const token = new Token();
    token.token = refreshToken;

    return await this.tokenRepository.save(token);
  }

  async findOne(refreshToken: string) {
    return await this.tokenRepository.findOneBy({
      token: refreshToken,
    });
  }
}
