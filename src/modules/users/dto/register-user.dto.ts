import { ITokens } from 'src/modules/auth/strategies/jwt-tokens.interface';
import { UserResponseDto } from './response-user.dto';

export class UserRegisterResponseDto extends UserResponseDto {
  token: ITokens;
}
