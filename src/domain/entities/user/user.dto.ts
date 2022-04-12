import { ApiProperty } from '@nestjs/swagger';

export default class User {
  private id?: string;

  @ApiProperty({
    example: 'Name',
    description: 'User name',
  })
  private readonly name: string;

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

  private createAt: Date;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
