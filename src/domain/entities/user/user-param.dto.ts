import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export default class UserParamDto {
  @IsString()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '62564ced5f6b0efa79a0b1cf',
    description: 'User id',
  })
  public readonly id: string;
}
