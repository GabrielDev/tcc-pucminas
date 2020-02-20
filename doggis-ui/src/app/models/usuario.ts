import { Especie, Avaliacao, Perfil, Login } from ".";

export class Usuario implements Login {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public senha: string,
        public foto: string,
        public cpf: string,
        public rg: string,
        public registro: string,
        public perfil: Perfil,
        public especialidades: Especie[],
        public avaliacoes: Avaliacao[],
        public dataInclusao: Date,
        public ativo: boolean,
    ) {}
}