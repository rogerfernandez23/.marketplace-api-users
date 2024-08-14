import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Users } from '../users/entities/user.entity';
import { AddressMapper } from './mapper/address.mapper';
import { AddressRepository } from './repositories/address.repository';
import { CepSearchService } from 'src/core/cep-search.service';
import { CepService } from './adapters/cep-service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Users])],
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressMapper,
    AddressRepository,
    CepSearchService,
    CepService,
  ],
})
export class AddressModule {}
