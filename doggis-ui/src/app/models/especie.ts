export class Especie {
    constructor(
        public id: number,
        public descricao: string,
        public icone: string,
        public dataInclusao: Date,
    ) {}
}

export enum TipoEspecie {
    CACHORRO = 1
}