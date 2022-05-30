import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RecipientHeaderDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'PARQUE_D_PEDRO_SHOPPING',
    description: 'Mall Domain',
  })
  public mall: string;

  public is_sandbox: boolean;

  public setMall(mall: string) {
    this.mall = mall;
  }

  public setIsSandbox(is_sandbox: boolean) {
    this.is_sandbox = is_sandbox;
  }
}
