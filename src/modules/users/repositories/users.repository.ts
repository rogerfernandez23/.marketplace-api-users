import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  repository = this.usersRepository.extend({});
}
