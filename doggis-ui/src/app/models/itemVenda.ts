import { Promocao, HistoricoPreco } from ".";

export interface ItemVenda {
    id: number,
    descricao: string,
    foto: string,
    valor: number,
    promocao: Promocao,
    dataInclusao: Date,
    historico: HistoricoPreco[]
}