import { Usuario } from ".";

export class HistoricoPreco {
    constructor(
        public id: number,
        public usuario: Usuario,
        public valor: number,
        public dataInclusao: Date,
    ) {}
}