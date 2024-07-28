import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressRepository extends Repository<Address> {}
