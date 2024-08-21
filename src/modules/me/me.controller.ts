import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RulesGuard } from '../auth/guard/rules.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Users } from '../users/entities/user.entity';

@Controller('me')
export class MeController {
  @Get()
  @UseGuards(AuthGuard('jwt'), RulesGuard)
  async me(@GetUser() users: Users): Promise<Users> {
    return users;
  }
}
