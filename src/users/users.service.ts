import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  // Created User
  async create(createUserDto: CreateUserDto) {
    const [isExist, documentValid] = await Promise.all([
      this.usersRepository.findOneBy({ email: createUserDto.email }),
      this.usersRepository.findOneBy({ document: createUserDto.document }),
    ]);

    if (isExist) {
      throw new ConflictException('e-mail already exists in our database');
    }

    if (documentValid) {
      throw new ConflictException('CPF already exists in our database');
    }

    return await this.usersRepository.save(createUserDto);
  }

  // Find all Users
  async findAll() {
    // if (!user.admin) {
    //   throw new UnauthorizedException(
    //     'You are not authorized to access this resource',
    //   );
    // }
    return await this.usersRepository.find();
  }

  // Find One User
  async findOne(id: string) {
    const userOne = await this.usersRepository.findOneBy({ id: id });

    if (!userOne) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return userOne;
  }

  // Edit User
  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersRepository.findOneBy({ id: id });

    if (!updateUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.update(id, updateUserDto);

    return await this.usersRepository.findOneBy({ id });
  }

  // Delete User
  async remove(id: string) {
    const deleteUser = await this.usersRepository.findOneBy({ id: id });

    if (!deleteUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.usersRepository.delete(id);
  }
}
