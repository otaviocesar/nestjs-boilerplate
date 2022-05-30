import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  Matches,
} from 'class-validator';

import { IsCPFOrCNPJ } from 'brazilian-class-validator';

export default class PostRecipientDto {
  private id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    example: 'Nome',
    description: 'Nome',
  })
  private nome: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: String,
    example: '341',
    description: 'codigoBanco',
  })
  private codigoBanco: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4)
  @ApiProperty({
    type: String,
    example: '0670',
    description: 'agencia',
  })
  private agencia: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '1',
    description: 'agenciaDv',
  })
  private agenciaDv: string;

  @IsString()
  @MinLength(1)
  @MaxLength(13)
  @ApiProperty({
    type: String,
    example: '99584',
    description: 'conta',
  })
  private conta: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @ApiProperty({
    type: String,
    example: '4',
    description: 'contaDv',
  })
  private contaDv: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String,
    example: 'conta_corrente',
    description: 'tipoConta',
  })
  private tipoConta: string;

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

  @IsString()
  @MinLength(3)
  @MaxLength(4)
  @ApiProperty({
    type: String,
    example: 'cnpj',
    description: 'tipoDocumento',
  })
  private tipoDocumento: string;

  public setNome(nome: string) {
    this.nome = nome;
  }

  public setCodigoBanco(codigoBanco: string) {
    this.codigoBanco = codigoBanco;
  }

  public setAgencia(agencia: string) {
    this.agencia = agencia;
  }

  public setAgenciaDv(agenciaDv: string) {
    this.agenciaDv = agenciaDv;
  }

  public setConta(conta: string) {
    this.conta = conta;
  }

  public setContaDv(contaDv: string) {
    this.contaDv = contaDv;
  }

  public setTipoConta(tipoConta: string) {
    this.tipoConta = tipoConta;
  }

  public setCpfCnpj(cpfCnpj: string) {
    this.cpfCnpj = cpfCnpj;
  }

  public setTipoDocumento(tipoDocumento: string) {
    this.tipoDocumento = tipoDocumento;
  }
}
