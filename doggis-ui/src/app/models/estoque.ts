import { Usuario, Produto, TipoEstoque } from ".";

export class Estoque {
    constructor(
        public id: number,
        public usuario: Usuario,
        public produto: Produto, 
        public quantidade: number,
        public saldo: number,
        public tipo: TipoEstoque | string,
        public dataInclusao: Date,
    ) {}
}