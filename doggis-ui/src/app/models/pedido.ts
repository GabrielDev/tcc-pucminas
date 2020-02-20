import { Cliente, Usuario, Pagamento, PedidoItem } from ".";

export class Pedido {
    constructor(
        public id: number,
        public cliente: Cliente,
        public usuario: Usuario,
        public pagamento: Pagamento,
        public patazBonusTotal: number,
        public patazDescontoTotal: number,
        public total: number,
        public dataPedido: Date,
        public itens: PedidoItem[]
    ) {}
}