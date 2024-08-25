import { UsersRepository } from '../../modules/users/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'verifyCPF', async: true })
@Injectable()
export class ValidateCPF implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validate(document: string): Promise<boolean> {
    const isCPFValid = await this.usersRepository.repository.findOneBy({
      document: document,
    });

    return !isCPFValid ? true : false;
  }

  defaultMessage(): string {
    return 'cpf invalid or already exists';
  }
}
