import { Especie } from ".";

export class Raca  {
    constructor(
        public id: number,
        public descricao: string,
        public especie: Especie,
        public dataInclusao: Date,
    ) {}
}