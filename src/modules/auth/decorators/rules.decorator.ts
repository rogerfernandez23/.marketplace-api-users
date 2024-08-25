import { SetMetadata } from '@nestjs/common';
import TypeUser from '../../../modules/users/enum/user-type.enum';

export const RULES_KEY = 'rules';
export const Rules = (...rules: TypeUser[]) => SetMetadata(RULES_KEY, rules);
