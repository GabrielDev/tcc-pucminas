import { ItemVenda, Categoria, Fabricante, Estoque, Promocao, HistoricoPreco } from ".";

export class Produto implements ItemVenda {
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
}