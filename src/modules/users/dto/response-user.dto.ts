import { Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;

  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string;

  gender: string;
  birth: Date;
  document: string;
  phone: string;
  email: string;
  admin: boolean;
}
