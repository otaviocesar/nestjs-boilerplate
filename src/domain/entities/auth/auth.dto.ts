import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';

export default class AuthDto {
  private id?: string;

  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String,
    example: 'email@dominio.com',
    description: 'User email',
  })
  private email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String,
    example: 'password',
    description: 'User password',
  })
  private password: string;

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  async comparePassword(attempt: string) {
    return bcrypt.compare(attempt, this.password);
  }
}
