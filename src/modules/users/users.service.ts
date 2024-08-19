import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UsersMapper } from './mapper/users.mapper';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private usersMapper: UsersMapper,
  ) {}

  // Created User
  async create(createUserDto: CreateUserDto) {
    const userCreate = this.usersMapper.toCreateUser(createUserDto);

    // userCreate.password = await userCreate.setPassword(createUserDto.password);

    const userRegister = await this.usersRepository.repository.save(userCreate);

    return await this.usersMapper.toResponseUser(userRegister);
  }

  // Find all Users
  async findAll(): Promise<UserResponseDto[]> {
    const allUsers = await this.usersRepository.repository.find();

    return allUsers.map((user) => this.usersMapper.toResponseUser(user));
  }

  // Find One User
  async findOne(id: string) {
    const userOne = await this.usersRepository.repository.findOneBy({ id: id });

    if (!userOne) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersMapper.toResponseUser(userOne);
  }

  // Edit User
  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersRepository.repository.findOneBy({
      id: id,
    });

    if (!updateUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.repository.update(id, updateUserDto);

    const userUpdate = await this.usersRepository.repository.findOneBy({ id });

    return this.usersMapper.toResponseUser(userUpdate);

    //
  }

  // Delete User
  async remove(id: string) {
    const deleteUser = await this.usersRepository.repository.findOneBy({
      id: id,
    });

    if (!deleteUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.usersRepository.repository.delete(id);
  }
}
