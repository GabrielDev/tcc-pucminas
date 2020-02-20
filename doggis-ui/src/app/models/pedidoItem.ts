import { ItemVenda } from ".";

export class PedidoItem {
    constructor(
        public id: number,
        public item: ItemVenda,
        public quantidade: number,
        public precoUnitario: number,
        public precoTotal: number,
        public patazBonusTotal: number,
    ) {}
}