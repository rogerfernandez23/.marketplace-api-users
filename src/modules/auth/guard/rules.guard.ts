import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import TypeUser from '../../../modules/users/enum/user-type.enum';
import { RULES_KEY } from '../decorators/rules.decorator';

@Injectable()
export class RulesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const rulesRequired = this.reflector.getAllAndOverride<TypeUser[]>(
      RULES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rulesRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return rulesRequired.some((rule) => user.TypeUser === rule);
  }
}
