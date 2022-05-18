import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RecipientHeaderDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'teste',
    description: 'teste',
  })
  public empreendimento: string;
}
