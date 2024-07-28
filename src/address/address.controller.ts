import { Post, Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  @Post()
  @MessagePattern('createAddress')
  async create(@Body() createAddressDto: CreateAddressDto) {
    await this.addressRepository.save(createAddressDto);
  }

  @MessagePattern('findAllAddress')
  findAll() {
    return this.addressService.findAll();
  }

  @MessagePattern('findOneAddress')
  findOne(@Payload() id: number) {
    return this.addressService.findOne(id);
  }

  @MessagePattern('updateAddress')
  update(@Payload() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(updateAddressDto.id, updateAddressDto);
  }

  @MessagePattern('removeAddress')
  remove(@Payload() id: number) {
    return this.addressService.remove(id);
  }
}
