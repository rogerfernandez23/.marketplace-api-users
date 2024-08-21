import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Users } from 'src/modules/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtTokens } from './strategies/jwt-tokens.';
import { UsersRepository } from '../users/repositories/users.repository';
import { TokenService } from '../tokens/token.service';
import { Token } from '../tokens/entities/tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Users, Token]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtTokens,
    UsersRepository,
    TokenService,
  ],
})
export class AuthModule {}
