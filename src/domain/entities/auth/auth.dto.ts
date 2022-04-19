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

  constructor(user?: Partial<AuthDto>) {
    this.email = user?.getEmail();
    this.password = user?.getPassword();
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
