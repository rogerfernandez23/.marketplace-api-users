import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  repository = this.addressRepository.extend({});
}
