import { Usuario, Cliente, Pet, Servico } from ".";

export class Agenda {
    constructor(
        public id: number,
        public usuario: Usuario,
        public cliente: Cliente,
        public pet: Pet,
        public servico: Servico,
        public dataAgenda: Date,
        public dataInclusao: Date,
    ) {}
}