import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @MessagePattern('createUser')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @MessagePattern('findAll')
  async findAll() {
    return { users: await this.usersService.findAll() };
  }

  @Get(':id')
  @MessagePattern('findById')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @MessagePattern('editUser')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @MessagePattern('deleteUser')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
