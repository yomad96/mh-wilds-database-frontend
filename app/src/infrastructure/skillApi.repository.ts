import {useApiComposable} from "@/infrastructure/useApiComposable.ts";
import type {SkillRepositoryInterface} from "@/domain/repositories/skillRepositoryInterface.ts";
import type {Skill} from "@/domain/entities/skill.ts";

export class SkillApiRepository implements SkillRepositoryInterface {
    private api = useApiComposable('http://localhost:8000/api')

    async getSkills(): Promise<Skill[]> {
        try {
            const response = await this.api.request<Skill[]>('/skills')
            // @ts-ignore
            return response.data['member'] ?? []
        } catch (error) {
            console.error("Error fetching skills:", error)
            throw new Error("Failed to fetch skills")
        }
    }
}
