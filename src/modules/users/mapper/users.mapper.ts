import { UserResponseDto } from './../dto/response-user.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Users } from '../entities/user.entity';
import { UserRegisterResponseDto } from '../dto/register-user.dto';

@Injectable()
export class UsersMapper {
  toCreateUser(createUserDTO: CreateUserDto): Users {
    const newUser = new Users();

    newUser.firstName = createUserDTO.firstName;
    newUser.lastName = createUserDTO.lastName;
    newUser.gender = createUserDTO.gender;
    newUser.birth = createUserDTO.birth;
    newUser.document = createUserDTO.document;
    newUser.phone = createUserDTO.phone;
    newUser.email = createUserDTO.email;
    newUser.password = createUserDTO.password;
    newUser.admin = createUserDTO.admin;

    return newUser;
  }

  toResponseUser(user: Users): UserResponseDto {
    const newUser = new UserResponseDto();

    newUser.id = user.id;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.gender = user.gender;
    newUser.birth = user.birth;
    newUser.document = user.document;
    newUser.phone = user.phone;
    newUser.email = user.email;
    newUser.admin = user.admin;

    return newUser;
  }

  toResponseRegisterUser(user: Users): UserRegisterResponseDto {
    const newUser = new UserRegisterResponseDto();

    newUser.id = user.id;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.gender = user.gender;
    newUser.birth = user.birth;
    newUser.document = user.document;
    newUser.phone = user.phone;
    newUser.email = user.email;
    newUser.admin = user.admin;

    return newUser;
  }
}
