import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import { AgeValidate } from 'src/core/validations/validate-age';
import { ValidateCPF } from 'src/core/validations/validate-cpf';
import { MailValidate } from 'src/core/validations/validate-email';

export class UpdateUserDto {
  id?: string;

  @IsOptional()
  @Length(3, 99, { message: 'the name must be 3 to 99 characters' })
  @Expose({ name: 'first_name' })
  firstName: string;

  @IsOptional()
  @Length(3, 99, { message: 'the surname must be 3 to 99 characters' })
  @Expose({ name: 'last_name' })
  lastName: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  @IsDateString()
  @Validate(AgeValidate)
  birth: Date;

  @IsOptional()
  @Length(11, 11, { message: 'CPF invalid' })
  @Validate(ValidateCPF)
  document: string;

  @IsOptional()
  @Length(11, 11, { message: 'phone invalid' })
  phone: string;

  @IsOptional()
  @IsEmail()
  @Validate(MailValidate)
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsBoolean({ message: '"admin" is a boolean' })
  admin: boolean;
}
