import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressMapper } from './mapper/address.mapper';
import { AddressRepository } from './repositories/address.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { CepService } from './adapters/cep-service';
import { AddressResponseDto } from './dto/response-address.dto';

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

    const checkQuantity = await this.addressRepository.repository.count({
      where: { user: { id: createAddressDto.user.id } },
    });

    if (checkQuantity >= 2) {
      throw new NotFoundException(
        'The user already has the maximum number of addresses registered.',
      );
    }

    const saveAddress =
      await this.addressRepository.repository.save(addressCreate);

    return await this.addressMapper.toResponseAddress(saveAddress);
  }

  async findAll(): Promise<AddressResponseDto[]> {
    const allAddress = await this.addressRepository.repository.find();

    return allAddress.map((address) =>
      this.addressMapper.toResponseAddress(address),
    );
  }

  async validateCep(cep: string) {
    return await this.cepService.cepValidate(cep);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const updateAddress = await this.addressRepository.repository.findOneBy({
      id: id,
    });

    if (!updateAddress) {
      throw new NotFoundException(`address with ID ${id} not found`);
    }

    if (updateAddressDto.postalCode) {
      await this.validateCep(updateAddressDto.postalCode);
    }

    await this.addressRepository.repository.update(id, updateAddressDto);

    const addressUpdate = await this.addressRepository.repository.findOneBy({
      id,
    });

    return this.addressMapper.toResponseAddress(addressUpdate);
  }
}
