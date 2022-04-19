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
  private name: string;

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

  private createAt: Date;

  constructor(user?: Partial<CreateUserDto>) {
    this.id = user?.getId();
    this.name = user?.getName();
    this.email = user?.getEmail();
    this.password = user?.getPassword();
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setCreateAt(createdAt: Date): this {
    this.createAt = createdAt;
    return this;
  }
}
