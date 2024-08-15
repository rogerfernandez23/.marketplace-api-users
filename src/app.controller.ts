import { Controller, Get } from '@nestjs/common';
import { HateoasIndex } from './core/hateoas/hateoas-index';

@Controller()
export class AppController {
  constructor(private hateoas: HateoasIndex) {}

  @Get()
  index() {
    return {
      start: 'Welcome to the Microservice Users - Marketplace',
      links: this.hateoas.getLinksHateoas(),
    };
  }
}
