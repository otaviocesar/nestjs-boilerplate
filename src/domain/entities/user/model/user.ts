import { ApiProperty } from '@nestjs/swagger';

export default class User {
  @ApiProperty({
    example: 'Name',
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    example: 'email@dominio.com',
    description: 'User email',
  })
  email: string;
}