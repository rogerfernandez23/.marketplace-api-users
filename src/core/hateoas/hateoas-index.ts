import { Injectable } from '@nestjs/common';
import { HateoasData } from './hateoas-data';
import { HateoasLinks } from './hateoas-interface';
import { UsersController } from '../../modules/users/users.controller';
import { AddressController } from '../../modules/address/address.controller';
import { MeController } from '../../modules/me/me.controller';
import { AuthController } from '../../modules/auth/auth.controller';

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
      'find_user_by_id',
      UsersController,
      UsersController.prototype.findOne,
    );

    this.addLinks(
      'POST',
      'create_user',
      UsersController,
      UsersController.prototype.create,
    );

    this.addLinks(
      'DELETE',
      'delete_user',
      UsersController,
      UsersController.prototype.remove,
    );

    this.addLinks(
      'GET',
      'find_user_by_id',
      UsersController,
      UsersController.prototype.findOne,
    );

    this.addLinks(
      'POST',
      'login_user',
      AuthController,
      AuthController.prototype.auth,
    );

    this.addLinks(
      'POST',
      'logout_user',
      AuthController,
      AuthController.prototype.logout,
    );

    this.addLinks(
      'POST',
      'refresh_token',
      AuthController,
      AuthController.prototype.newAuthenticate,
    );

    this.addLinks(
      'GET',
      'user_logged_in',
      MeController,
      MeController.prototype.me,
    );

    this.addLinks(
      'GET',
      'return_all_address',
      AddressController,
      AddressController.prototype.findAll,
    );

    this.addLinks(
      'GET',
      'validate_cep',
      AddressController,
      AddressController.prototype.validateCep,
    );

    this.addLinks(
      'POST',
      'create_address',
      AddressController,
      AddressController.prototype.create,
    );

    this.addLinks(
      'PATCH',
      'update_address',
      AddressController,
      AddressController.prototype.update,
    );

    return this.LINKS;
  }
}
