import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RecipientParamDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 're_c24oxwxb61iw00o9tofxshtb2',
    description: 'Recipient id',
  })
  public id: string;
}
