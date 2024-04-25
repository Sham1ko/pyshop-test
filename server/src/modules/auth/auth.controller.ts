import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MeResponseDto } from './dto/me-response.dto';
import { UserDto } from '../user/types/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: any) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: any) {
    return this.authService.login(data);
  }

  @Get('me')
  me(@Request() req: any) {
    return this.authService.me(req);
  }
}
