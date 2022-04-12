import { ApiProperty } from '@nestjs/swagger';

export default class AuthDto {
  @ApiProperty({
    example: 'email@dominio.com',
    description: 'User email',
  })
  private readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  private readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }
}
