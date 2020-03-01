export class Pagamento {
    constructor(
        public id: number,
        public descricao: string,
        public icone: string | '',
        public dataInclusao: Date,
    ) {}
}