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

export class Agendamento {
    constructor(
        public usuario: Usuario,
        public disponiveis: Date[],
        public marcados: Date[],
    ) {}
}

export const CalendarioTraducao = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["Do","Se","Te","Qa","Qi","Se","Sa"],
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Wk'
}