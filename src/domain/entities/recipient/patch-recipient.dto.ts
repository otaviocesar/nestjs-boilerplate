export default class PatchRecipientDto {
  contaBancaria: ContaBancaria;

  constructor(contaBancaria?: ContaBancaria) {
    this.contaBancaria = contaBancaria;
  }
}

export interface ContaBancaria {
  id: number;
  codigoBanco: string;
  agencia: string;
  agenciaDv: string;
  conta: string;
  contaDv: string;
  tipoConta: string;
  cpfCnpj: string;
  tipoDocumento: string;
}
