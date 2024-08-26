import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CepSearchResponseDto } from '../modules/address/dto/cep-search.dto';

Injectable();
export class CepSearchService {
  async searchCepValidate(cep: string) {
    const URL = `https://viacep.com.br/ws/${cep}/json/`;
    let address = new CepSearchResponseDto();

    try {
      const response = await axios.get(URL);

      address = response.data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name['status'] === 400) {
          throw new BadRequestException('invalid cep');
        }

        if (error.name['status'] === 500) {
          throw new BadRequestException('server currently unavailable');
        }
      }

      if (address['erro'] == true) {
        throw new BadRequestException('cep does not exist');
      }

      throw error;
    }

    return address;
  }
}
