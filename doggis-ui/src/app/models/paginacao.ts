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

export interface Pagina {
    first?: number
    rows?: number
    page: number
    pageCount?: number
}