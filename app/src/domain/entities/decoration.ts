export class Decoration {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public icon?: string[],
        public kind?: string,
        public skills?: string[],
    ) {}
}