import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { ITokens } from './strategies/jwt-tokens.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  auth(@Body() userAuthDto: UserAuthDto): Promise<ITokens> {
    return this.authService.login(userAuthDto);
  }

  @Post('refresh')
  newAuthenticate(@Request() req) {
    return this.authService.newAuthenticate(req);
  }
}
