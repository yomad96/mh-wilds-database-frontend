import {computed, reactive} from 'vue';
import type {Charm} from "@/domain/entities/charm.ts";

export enum ListCharmsStatus {
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed",
    EMPTY = "empty"
}

export type ListCharmStateType = {
    status: ListCharmsStatus
    charms: Charm[];
    error: string | null;
}

const ListCharmInitialState: ListCharmStateType = {
    status: ListCharmsStatus.EMPTY,
    charms: [],
    error: null
}

const ListCharmState = reactive<ListCharmStateType>(ListCharmInitialState)


export const getListCharmStatus = computed(() => ListCharmState.status)
export const getListCharmData = computed(() => ListCharmState.charms)
export const getListCharmError = computed(() => ListCharmState.error)

export default ListCharmState