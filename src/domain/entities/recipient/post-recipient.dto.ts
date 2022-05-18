import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

export default class PostRecipientDto {
  private id: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '341',
    description: 'codigoBanco',
  })
  private codigoBanco: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '0670',
    description: 'agencia',
  })
  private agencia: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '123',
    description: 'agenciaDv',
  })
  private agenciaDv: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '99584',
    description: 'conta',
  })
  private conta: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '4',
    description: 'contaDv',
  })
  private contaDv: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'conta_corrente',
    description: 'tipoConta',
  })
  private tipoConta: string;

  @IsString()
  @MinLength(14)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '08803837000180',
    description: 'cpfCnpj',
  })
  private cpfCnpj: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'cnpj',
    description: 'tipoDocumento',
  })
  private tipoDocumento: string;

  public getId(): string {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getCodigoBanco(): string {
    return this.codigoBanco;
  }

  public setCodigoBanco(codigoBanco: string) {
    this.codigoBanco = codigoBanco;
  }

  public getAgencia(): string {
    return this.agencia;
  }

  public setAgencia(agencia: string) {
    this.agencia = agencia;
  }

  public getAgenciaDv(): string {
    return this.agenciaDv;
  }

  public setAgenciaDv(agenciaDv: string) {
    this.agenciaDv = agenciaDv;
  }

  public getConta(): string {
    return this.conta;
  }

  public setConta(conta: string) {
    this.conta = conta;
  }

  public getContaDv(): string {
    return this.contaDv;
  }

  public setContaDv(contaDv: string) {
    this.contaDv = contaDv;
  }

  public getTipoConta(): string {
    return this.tipoConta;
  }

  public setTipoConta(tipoConta: string) {
    this.tipoConta = tipoConta;
  }

  public getCpfCnpj(): string {
    return this.cpfCnpj;
  }

  public setCpfCnpj(cpfCnpj: string) {
    this.cpfCnpj = cpfCnpj;
  }

  public getTipoDocumento(): string {
    return this.tipoDocumento;
  }

  public setTipoDocumento(tipoDocumento: string) {
    this.tipoDocumento = tipoDocumento;
  }
}
