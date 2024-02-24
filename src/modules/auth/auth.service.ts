import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword, hashPassword } from '@/common/helpers/hash.helper';
import { CustomException } from '@/common/response/CustomException';
import { PrismaService } from '@/providers/prisma';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new CustomException('Email/password not valid', 400);
    }

    const validatePassword = await comparePassword(password, user.password);

    if (!validatePassword) {
      throw new CustomException('Email/password not valid', 400);
    }

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        id: user.id,
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, name, email, password } = registerDto;

    const user = await this.prismaService.users.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      throw new NotFoundException('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.prismaService.users.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        user_type: 'ADMIN',
      },
    });

    return {
      access_token: this.jwtService.sign({
        username: newUser.username,
        id: newUser.id,
      }),
    };
  }

  // Can be written separately in the user module
  async getUser(user_id: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: user_id
      },
    });

    const { username, user_type } = user;
    return {
      username,
      id: user_id,
      role: user_type,
    };
  }
}
