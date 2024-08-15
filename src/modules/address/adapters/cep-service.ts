import { Injectable } from '@nestjs/common';
import { ICepSearch } from './ICep-search';
import { CepSearchResponseDto } from '../dto/cep-search.dto';
import { CepSearchService } from 'src/core/cep-search.service';

@Injectable()
export class CepService implements ICepSearch {
  constructor(private cepSearch: CepSearchService) {}

  async cepValidate(cep: string): Promise<CepSearchResponseDto> {
    return await this.cepSearch.searchCepValidate(cep);
  }
}
