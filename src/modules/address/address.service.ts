import { AddressMapper } from './mapper/address.mapper';
import { AddressRepository } from './repositories/address.repository';
import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { CepService } from './adapters/cep-service';

@Injectable()
export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
    private addressMapper: AddressMapper,
    private cepService: CepService,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    await this.validateCep(createAddressDto.postalCode);

    const addressCreate =
      await this.addressMapper.toCreateAddress(createAddressDto);

    const saveAddress =
      await this.addressRepository.repository.save(addressCreate);

    return await this.addressMapper.toResponseAddress(saveAddress);
  }

  async validateCep(cep: string) {
    return await this.cepService.cepValidate(cep);
  }
}
