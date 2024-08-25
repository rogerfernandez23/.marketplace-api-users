import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { BRAZILIAN_STATES } from '../../../configs/constants-states';
import { Users } from '../../../modules/users/entities/user.entity';
export class CreateAddressDto {
  id: string;

  @IsNotEmpty()
  street: string;

  @Expose({ name: 'number_house' })
  @IsNotEmpty()
  numberHouse: number;

  @IsNotEmpty()
  city: string;

  @MaxLength(2)
  @IsIn(BRAZILIAN_STATES)
  @IsNotEmpty()
  state: string;

  @Expose({ name: 'cep' })
  @IsNotEmpty()
  postalCode: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  @Expose({ name: 'reference_address' })
  additionalInfo?: string;

  user: Users;
}
