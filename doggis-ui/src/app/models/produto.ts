import { ItemVenda, Categoria, Fabricante, Estoque, Promocao, HistoricoPreco } from ".";
import { TipoItem } from './tipoItem';

export class Produto implements ItemVenda {
    tipo: TipoItem = TipoItem.PRODUTO
    patazBonus: number

    constructor(
        public id: number,
        public descricao: string,
        public foto: string,
        public valor: number,
        public categoria: Categoria,
        public fabricante: Fabricante,
        public estoque: Estoque,
        public promocao: Promocao,
        public historico: HistoricoPreco[],
        public dataInclusao: Date,
    ) {}

    get totalEstoque() {
        return this.estoque.quantidade
    }
}