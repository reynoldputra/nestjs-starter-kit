import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Token } from '@/common/decorators/token.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @HttpCode(200)
  @ResponseMessage('Success login')
  async login(@Body() loginDto: LoginDto) {
    const login = await this.authService.login(loginDto);
    return login;
  }

  @Post('register')
  @HttpCode(201)
  @ResponseMessage('Success create new user')
  async register(@Body() registerDto: RegisterDto) {
    const register = await this.authService.register(registerDto);
    return register;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ResponseMessage('Token valid')
  async validateToken(@Token('id') id: string) {
    const user = await this.authService.getUser(id);
    return user;
  }
}
