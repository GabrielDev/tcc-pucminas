export class Paginacao<T> {
    constructor(
        public totalPages: number,
        public totalElements: number,
        public numberOfElements: number,
        public empty: boolean,
        public last: boolean,
        public first: boolean,
        public size: number,
        public number: number,
        public current: number,
        public content: T[]
    ) {}
}

export class Pagina {
    constructor(
        public first: number,
        public rows: number,
        public page: number = 1,
        public pageCount: number
    ) {}
}