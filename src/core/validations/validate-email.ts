import { UsersRepository } from './../../modules/users/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'mailVerify', async: true })
@Injectable()
export class MailValidate implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validate(email: string) {
    const isEmailValid = await this.usersRepository.repository.findOneBy({
      email: email,
    });

    return !isEmailValid ? true : false;
  }

  defaultMessage(): string {
    return 'e-mail already exists';
  }
}
