import { Papel } from ".";

export class Perfil {
    constructor (
         public id: number,
         public descricao: string,
         public papeis: Papel[],
         public dataInclusao: Date,
    ) {}
}