import { Cliente, Usuario, Pagamento, PedidoItem } from ".";

export interface IPedido {
    id: number
    cliente: Cliente
    usuario: Usuario
    pagamento: Pagamento
    patazBonusTotal: number
    patazDescontoTotal: number
    desconto: number
    subtotal: number
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
    public desconto: number = 0
    public subtotal: number = 0
    public total: number = 0
    public dataPedido: Date
    public itens: PedidoItem[] = []

    constructor() {}
}