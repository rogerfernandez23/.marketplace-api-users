import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { CepSearchResponseDto } from 'src/modules/address/dto/cep-search.dto';

Injectable();
export class CepSearchService {
  async searchCepValidate(cep: string) {
    const URL = `https://viacep.com.br/ws/${cep}/json/`;
    let address = new CepSearchResponseDto();

    try {
      const response = await axios.get(URL);

      address = response.data;
    } catch (error) {
      if (error.response['status'] === 400) {
        throw new BadRequestException('invalid cep');
      }

      if (error.response['status'] === 500) {
        throw new BadRequestException('server currently unavailable');
      }
    }

    if (address['erro'] == true) {
      throw new BadRequestException('cep does not exist');
    }

    return address;
  }
}
