import { AddressResponseDto } from '../dto/response-address.dto';
import { Address } from '../entities/address.entity';
import { CreateAddressDto } from './../dto/create-address.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressMapper {
  toCreateAddress(createAddressDto: CreateAddressDto): Address {
    const newAddress = new Address();

    newAddress.street = createAddressDto.street;
    newAddress.numberHouse = createAddressDto.numberHouse;
    newAddress.city = createAddressDto.city;
    newAddress.state = createAddressDto.state;
    newAddress.postalCode = createAddressDto.postalCode;
    newAddress.complement = createAddressDto.complement;
    newAddress.additionalInfo = createAddressDto.additionalInfo;
    newAddress.user = createAddressDto.user;

    return newAddress;
  }

  toResponseAddress(address: Address): AddressResponseDto {
    const newAddress = new AddressResponseDto();

    newAddress.street = address.street;
    newAddress.numberHouse = address.numberHouse;
    newAddress.city = address.city;
    newAddress.state = address.state;
    newAddress.postalCode = address.postalCode;
    newAddress.complement = address.complement;
    newAddress.additionalInfo = address.additionalInfo;
    newAddress.user = address.user.id;

    return newAddress;
  }
}
