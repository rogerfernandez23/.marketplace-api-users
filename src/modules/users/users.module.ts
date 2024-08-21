import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersMapper } from './mapper/users.mapper';
import { UsersRepository } from './repositories/users.repository';
import { MailValidate } from 'src/core/validations/validate-email';
import { ValidateCPF } from 'src/core/validations/validate-cpf';
import { JwtTokens } from '../auth/strategies/jwt-tokens.';
import { TokenService } from '../tokens/token.service';
import { JwtModule } from '@nestjs/jwt';
import { Token } from '../tokens/entities/tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Token]), JwtModule.register({})],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersMapper,
    UsersRepository,
    MailValidate,
    ValidateCPF,
    JwtTokens,
    TokenService,
  ],
})
export class UsersModule {}
