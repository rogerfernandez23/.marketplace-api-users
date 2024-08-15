import { Injectable } from '@nestjs/common';
import { HateoasData } from './hateoas-data';
import { HateoasLinks } from './hateoas-interface';
import { UsersController } from 'src/modules/users/users.controller';
import { AddressController } from 'src/modules/address/address.controller';

@Injectable()
export class HateoasIndex extends HateoasData {
  getLinksHateoas(): HateoasLinks[] {
    this.LINKS = [];

    this.addLinks(
      'GET',
      'return_all_users',
      UsersController,
      UsersController.prototype.findAll,
    );

    this.addLinks(
      'GET',
      'return_all_address',
      AddressController,
      AddressController.prototype.findAll,
    );

    return this.LINKS;
  }
}
