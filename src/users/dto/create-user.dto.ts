import { IsEmail, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 99, { message: 'the name must be 3 to 99 characters' })
  firstName: string;

  @IsNotEmpty({ message: 'surname is required' })
  @Length(3, 99, { message: 'the surname must be 3 to 99 characters' })
  lastName: string;

  @IsNotEmpty({ message: 'enter the gender' })
  gender: string;

  @IsNotEmpty({ message: 'enter date of birth' })
  birth: Date;

  @IsNotEmpty({ message: 'enter the CPF' })
  @Length(11, 11, { message: 'CPF invalid' })
  document: string;

  @IsNotEmpty({ message: 'phone is required' })
  @Length(11, 11, { message: 'phone invalid' })
  phone: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @Min(6, { message: 'password must be at least 6 characters long' })
  password: string;
}
