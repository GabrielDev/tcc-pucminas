import { Usuario, ItemVenda } from ".";

export class Promocao {
    constructor(
        public id: number,
        public usuario: Usuario,
        public item: ItemVenda,
        public desconto: number,
        public inicio: Date,
        public fim: Date
    ) {}
}