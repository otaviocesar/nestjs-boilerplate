import { ApiProperty } from '@nestjs/swagger';

import { Document } from 'mongoose';

export default class User extends Document {
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

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  password: string;
}
