import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class ResponseErrorDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Error message.',
  })
  private message: string;

  @ApiProperty({
    type: Number,
    description: 'statusCode',
  })
  private statusCode: number;

  @ApiProperty({
    type: String,
    description: 'timestamp',
  })
  private timestamp: string;

  @ApiProperty({
    type: String,
    description: 'path',
  })
  private path: string;
}
