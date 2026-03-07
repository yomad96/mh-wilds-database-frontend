import type {Skill} from "@/domain/entities/skill.ts";

export interface SkillRepositoryInterface {
    getSkills(): Promise<Skill[]>;
}
