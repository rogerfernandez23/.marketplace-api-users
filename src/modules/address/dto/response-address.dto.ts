import { Expose } from 'class-transformer';
import { Users } from 'src/modules/users/entities/user.entity';

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
  user: Users;
}
