import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Users } from '../../../modules/users/entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
