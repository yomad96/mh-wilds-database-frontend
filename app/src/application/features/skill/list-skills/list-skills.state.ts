import {computed, reactive} from 'vue';
import type {Skill} from "@/domain/entities/skill.ts";

export enum ListSkillsStatus {
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed",
    EMPTY = "empty"
}

export type ListSkillStateType = {
    status: ListSkillsStatus
    skills: Skill[];
    error: string | null;
}

const ListSkillInitialState: ListSkillStateType = {
    status: ListSkillsStatus.EMPTY,
    skills: [],
    error: null
}

const ListSkillState = reactive<ListSkillStateType>(ListSkillInitialState)

export const getListSkillStatus = computed(() => ListSkillState.status)
export const getListSkillData = computed(() => ListSkillState.skills)
export const getListSkillError = computed(() => ListSkillState.error)

export default ListSkillState
