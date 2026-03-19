import {computed, reactive} from "vue";

export enum LogoutStatus {
    IDLE = 'idle',
    SUCCESS = 'success'
}

export type LogoutStateType = {
    status: LogoutStatus
}

const LogoutInitialState: LogoutStateType = {
    status: LogoutStatus.IDLE
}

const LogoutState = reactive<LogoutStateType>(LogoutInitialState)

export const getLogoutStatus = computed(() => LogoutState.status)

export default LogoutState
