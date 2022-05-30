import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

import { IsCPFOrCNPJ } from 'brazilian-class-validator';

export default class PatchAllRecipientDto {
  public id: string;

  public codigoBanco: string;

  public agencia: string;

  public agenciaDv: string;

  public conta: string;

  public contaDv: string;

  public tipoConta: string;

  @IsString()
  @IsCPFOrCNPJ()
  @Matches(/(^\d{11}$)|(^\d{14}$)/, {
    message: 'cpfCnpj must be 11-14 character numbers.',
  })
  @ApiProperty({
    type: String,
    example: '08803837000180',
    description: 'cpfCnpj',
  })
  public cpfCnpj: string;

  public tipoDocumento: string;

  public setCpfCnpj(cpfCnpj: string) {
    this.cpfCnpj = cpfCnpj;
  }
}
