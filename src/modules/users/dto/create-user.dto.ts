import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import { AgeValidate } from '../../../core/validations/validate-age';
import { ValidateCPF } from '../../../core/validations/validate-cpf';
import { MailValidate } from '../../../core/validations/validate-email';

export class CreateUserDto {
  id: string;

  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 99, { message: 'the name must be 3 to 99 characters' })
  @Expose({ name: 'first_name' })
  firstName: string;

  @IsNotEmpty({ message: 'surname is required' })
  @Length(3, 99, { message: 'the surname must be 3 to 99 characters' })
  @Expose({ name: 'last_name' })
  lastName: string;

  @IsNotEmpty({ message: 'enter the gender' })
  gender: string;

  @IsNotEmpty({ message: 'enter date of birth' })
  @IsDateString()
  @Validate(AgeValidate)
  birth: Date;

  @IsNotEmpty({ message: 'enter the CPF' })
  @Length(11, 11, { message: 'CPF invalid' })
  @Validate(ValidateCPF)
  document: string;

  @IsNotEmpty({ message: 'phone is required' })
  @Length(11, 11, { message: 'phone invalid' })
  phone: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  @Validate(MailValidate)
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;

  @IsBoolean({ message: '"admin" is a boolean' })
  admin: boolean;
}
