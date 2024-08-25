import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../../modules/users/dto/response-user.dto';

export class AddressResponseDto {
  id: string;

  street: string;

  @Expose({ name: 'number_house' })
  numberHouse: number;

  city: string;

  state: string;

  postalCode: string;

  complement?: string;

  @Expose({ name: 'reference_address' })
  additionalInfo?: string;

  @Expose({ name: 'user_id' })
  @Type(() => UserResponseDto)
  user: string;
}
