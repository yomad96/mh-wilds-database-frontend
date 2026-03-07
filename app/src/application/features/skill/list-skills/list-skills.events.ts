import type {Skill} from "@/domain/entities/skill.ts";
import {
    ListSkillsStatus,
    type ListSkillStateType
} from "@/application/features/skill/list-skills/list-skills.state.ts";

export interface ListSkillsEventsInterface {
    loadingStarted(): void;
    loadingIsEmpty(): void;
    loadingSucceeded(skills: Skill[]): void;
    loadingFailed(error: string): void;
}

export class ListSkillsEvents implements ListSkillsEventsInterface {
    constructor(private state: ListSkillStateType) {}
    loadingStarted(): void {
        this.state.status = ListSkillsStatus.LOADING;
    }

    loadingSucceeded(skills: Skill[]): void {
        this.state.status = ListSkillsStatus.SUCCESS
        this.state.skills = skills
    }

    loadingIsEmpty(): void {
        this.state.status = ListSkillsStatus.EMPTY
        this.state.skills = []
    }

    loadingFailed(error: string): void {
        this.state.status = ListSkillsStatus.FAILED
        this.state.error = error
    }
}
