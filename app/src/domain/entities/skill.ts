export class Skill {
    constructor(
        public id: number,
        public name: string,
        public description?: string,
        public level?: number,
        public icon?: string[],
        public skillRanks?: SkillRank[],
    ) {}
}

export class SkillRank {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public level: number,
        public icon?: string[],
    ) {
    }
}
