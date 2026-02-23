import {computed, reactive} from 'vue';
import type {Decoration} from "@/domain/entities/decoration.ts";

export enum ListDecorationStatus {
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed",
    EMPTY = "empty"
}

export type ListDecorationStateType = {
    status: ListDecorationStatus
    decorations: Decoration[];
    error: string | null;
}

const ListDecorationInitialState: ListDecorationStateType = {
    status: ListDecorationStatus.EMPTY,
    decorations: [],
    error: null
}

const ListDecorationState = reactive<ListDecorationStateType>(ListDecorationInitialState)


export const getListDecorationStatus = computed(() => ListDecorationState.status)
export const getListDecorationData = computed(() => ListDecorationState.decorations)
export const getListDecorationError = computed(() => ListDecorationState.error)

export default ListDecorationState