import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export default class FindUserDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: '62564ced5f6b0efa79a0b1cf',
    description: 'User id',
  })
  private readonly id: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String,
    example: 'Name',
    description: 'User name',
  })
  private readonly name: string;

  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String,
    example: 'email@dominio.com',
    description: 'User email',
  })
  private readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
