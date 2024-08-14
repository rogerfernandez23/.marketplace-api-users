import { Post, Body, Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createUserDto: CreateAddressDto) {
    return await this.addressService.create(createUserDto);
  }

  @Get()
  async validateCep(@Body() cep: string) {
    return await this.addressService.validateCep(cep);
  }
}
