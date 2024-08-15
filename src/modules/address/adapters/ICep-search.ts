import { CepSearchResponseDto } from '../dto/cep-search.dto';

export abstract class ICepSearch {
  abstract cepValidate(cep: string): Promise<CepSearchResponseDto>;
}
