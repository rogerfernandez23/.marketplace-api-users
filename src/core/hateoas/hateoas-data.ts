import { Injectable } from '@nestjs/common';
import {
  ControllerClass,
  ControllerMethod,
  UrlGeneratorService,
} from 'nestjs-url-generator';
import { HateoasLinks } from './hateoas-interface';

@Injectable()
export abstract class HateoasData {
  constructor(public urlGeneratorService: UrlGeneratorService) {}

  LINKS: HateoasLinks[] = [];

  abstract getLinksHateoas(): HateoasLinks[];

  protected addLinks(
    method: string,
    description: string,
    controller: ControllerClass,
    controllerMethod: ControllerMethod,
    param?,
  ) {
    this.LINKS.push({
      type: method,
      rel: description,
      uri: this.urlGeneratorService.generateUrlFromController({
        controller: controller,
        controllerMethod: controllerMethod,
        params: param,
      }),
    });
  }
}
