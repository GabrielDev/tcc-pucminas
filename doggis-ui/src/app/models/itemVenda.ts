import { Promocao, HistoricoPreco } from ".";
import { TipoItem } from './tipoItem';

export interface ItemVenda {
    id: number,
    descricao: string,
    foto: string,
    valor: number,
    promocao: Promocao,
    dataInclusao: Date,
    historico: HistoricoPreco[],
    tipo: TipoItem,
    totalEstoque?: number,
    patazBonus?: number,
}