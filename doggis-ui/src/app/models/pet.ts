import { Cliente, Especie, Raca, Porte } from ".";

export class Pet {
    constructor(
        public id: number,
        public nome: string,
        public dono: Cliente,
        public especie: Especie,
        public raca: Raca,
        public porte: Porte,
        public alergia: string,
        public descricao: string,
        public dataInclusao: Date,
    ) {}
}