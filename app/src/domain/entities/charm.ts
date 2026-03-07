import type {Skill} from "@/domain/entities/skill.ts";

export class Charm {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public skills?: Skill[],
    ) {}
}