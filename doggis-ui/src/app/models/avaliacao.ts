import { Usuario, Cliente, PedidoItem } from ".";

export class Avaliacao {
    constructor(
        public id: number,
        public cliente: Cliente,
        public usuario: Usuario,
        public nota: number,
        public pedidoItem: PedidoItem,
        public dataInclusao: Date,
    ) {}
}