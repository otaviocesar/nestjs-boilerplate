import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export default class CreateUserDto {
  private id?: string;

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

  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String,
    example: 'password',
    description: 'User password',
  })
  private password: string;

  private createAt: Date;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public setCreateAt(createdAt: Date): this {
    this.createAt = createdAt;
    return this;
  }
}
