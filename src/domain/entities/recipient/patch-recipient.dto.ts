export default class PatchRecipientDto {
  nome: string;
  contaBancaria: ContaBancaria;

  constructor(contaBancaria?: ContaBancaria) {
    this.contaBancaria = contaBancaria;
  }

  public setNome(nome: string) {
    this.contaBancaria.nome = nome;
    this.nome = nome;
  }

  public setCodigoBanco(codigoBanco: string) {
    this.contaBancaria.codigoBanco = codigoBanco;
  }

  public setAgencia(agencia: string) {
    this.contaBancaria.agencia = agencia;
  }

  public setAgenciaDv(agenciaDv: string) {
    this.contaBancaria.agenciaDv = agenciaDv;
  }

  public setConta(conta: string) {
    this.contaBancaria.conta = conta;
  }

  public setContaDv(contaDv: string) {
    this.contaBancaria.contaDv = contaDv;
  }

  public setTipoConta(tipoConta: string) {
    this.contaBancaria.tipoConta = tipoConta;
  }

  public setCpfCnpj(cpfCnpj: string) {
    this.contaBancaria.cpfCnpj = cpfCnpj;
  }

  public setTipoDocumento(tipoDocumento: string) {
    this.contaBancaria.tipoDocumento = tipoDocumento;
  }
}

export interface ContaBancaria {
  id: number;
  nome: string;
  codigoBanco: string;
  agencia: string;
  agenciaDv: string;
  conta: string;
  contaDv: string;
  tipoConta: string;
  cpfCnpj: string;
  tipoDocumento: string;
}
