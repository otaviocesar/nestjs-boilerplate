import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export default class UpdateUserDto {
  private id?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Name',
    description: 'User name',
  })
  private readonly name: string;

  @IsEmail()
  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'email@dominio.com',
    description: 'User email',
  })
  private readonly email: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    type: String,
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

  public setCreateAt(createdAt: Date): this {
    this.createAt = createdAt;
    return this;
  }
}
