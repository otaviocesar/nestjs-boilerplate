export default class GetRecipientDto {
  id: string;
  nome: string;
  receberPagamentoAutomatico: boolean;
  dataCriacaoTransacao: Date;
  dataAtualizacaoTransacao: Date;
  urlRecebeEstadoTransacao: string;
  statusRecebedorMomento: string;
  motivoStatus: string;
  contaBancaria: ContaBancaria;
  regraLiquidacao: RegraLiquidacao;
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

export interface RegraLiquidacao {
  frequencia: string;
  diaTransferencia: number;
  transferenciaAutomatica: boolean;
  diasAntecipacao: string;
  diasContadoParaTras: number;
  limiteVolumeAntecipado: number;
}
