import {SkillRank} from "@/domain/entities/skill.ts";

export class User {
    constructor(
        public displayName: string | null,
        public roles: string[],
        public email: string | null,
    ) {
    }
}