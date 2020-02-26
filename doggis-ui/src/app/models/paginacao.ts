export class Paginacao<T> {
    constructor(
        public pages: number,
        public count: number,
        public current: number,
        public data: T[]
    ) {}
}