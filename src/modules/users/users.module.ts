import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersMapper } from './mapper/users.mapper';
import { UsersRepository } from './repositories/users.repository';
import { MailValidate } from 'src/core/validations/validate-email';
import { ValidateCPF } from 'src/core/validations/validate-cpf';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersMapper,
    UsersRepository,
    MailValidate,
    ValidateCPF,
  ],
})
export class UsersModule {}
