import { Post, Body, Controller, Get, Patch, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { instanceToPlain } from 'class-transformer';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createUserDto: CreateAddressDto) {
    return await this.addressService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const address = await this.addressService.findAll();

    return instanceToPlain(address);
  }

  @Get('/validate')
  async validateCep(@Body() body: { cep: string }) {
    const { cep } = body;

    return await this.addressService.validateCep(cep);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.addressService.update(id, updateUserDto);
  }
}
