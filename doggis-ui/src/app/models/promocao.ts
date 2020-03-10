import { Usuario, ItemVenda } from ".";
import { Produto } from './produto';
import { Servico } from './servico';

export class Promocao {
    constructor(
        public id: number,
        public usuario: Usuario,
        public item: ItemVenda,
        public desconto: number,
        public inicio: Date,
        public fim: Date,
        public produto?: Produto,
        public servico?: Servico,
    ) {}
}