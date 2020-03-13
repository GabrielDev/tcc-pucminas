import { ItemVenda } from ".";
import { Servico } from './servico';
import { Produto } from './produto';

export class PedidoItem {
    constructor(
        public id: number,
        public item: ItemVenda,
        public quantidade: number,
        public precoUnitario: number,
        public precoTotal: number,
        public patazBonusTotal: number,
        public servico?: Servico,
        public produto?: Produto
    ) {}
}