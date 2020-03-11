import { Cliente, Usuario, Pagamento, PedidoItem } from ".";

export interface IPedido {
    id: number
    cliente: Cliente
    usuario: Usuario
    pagamento: Pagamento
    patazBonusTotal: number
    patazDescontoTotal: number
    total: number
    dataPedido: Date
    itens: PedidoItem[]
}

export class Pedido implements IPedido {
    public id: number    
    public cliente: Cliente
    public usuario: Usuario
    public pagamento: Pagamento
    public patazBonusTotal: number
    public patazDescontoTotal: number
    public total: number
    public dataPedido: Date
    public itens: PedidoItem[] = []

    constructor() {}
}