import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'new user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'Use new',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'newuser@gmail.com',
  })
  @IsEmail()
  email: string;
}
