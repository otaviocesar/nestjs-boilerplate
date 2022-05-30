import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class ResponseSucessDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Success message.',
  })
  private message: string;

  @ApiProperty({
    type: String,
    description: 'Id for tracking the flow of calls generated on API Gateway',
  })
  private httpClientTrackingId: string;
}
