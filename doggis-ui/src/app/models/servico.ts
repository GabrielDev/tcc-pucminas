import { ItemVenda, Perfil, Promocao, HistoricoPreco, Produto } from ".";

export class Servico implements ItemVenda {
    constructor(
        public id: number,
        public descricao: string,
        public foto: string,
        public valor: number,
        public duracao: string,
        public patazBonus: number,
        public patazDesconto: number,
        public responsavel: Perfil,
        public promocao: Promocao,
        public historico: HistoricoPreco[],
        public produtos: Produto[],
        public dataInclusao: Date,
    ) {}
}