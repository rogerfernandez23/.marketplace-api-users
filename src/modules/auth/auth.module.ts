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

@Module({
  imports: [TypeOrmModule.forFeature([Auth, Users]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtTokens, UsersRepository],
})
export class AuthModule {}
