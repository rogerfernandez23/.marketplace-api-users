import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<Users> {}
