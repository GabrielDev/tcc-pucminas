import { Estado, Pet, Avaliacao, Login } from ".";

export class Cliente implements Login {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public senha: string,
        public foto: string,
        public cpf: string,
        public rg: string,
        public endereco: string,
        public bairro: string,
        public estado: Estado,
        public pets: Pet[],
        public totalPataz: number,
        public isAutorizaFoto: boolean,
        public avaliacoes: Avaliacao[],
        public dataInclusao: Date,
    ) {}

}