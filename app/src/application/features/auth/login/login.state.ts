import {computed, reactive} from "vue";

export enum LoginStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed'
}

export type LoginStateType = {
    status: LoginStatus
    error: string | null
}

const LoginInitialState: LoginStateType = {
    status: LoginStatus.IDLE,
    error: null
}

const LoginState = reactive<LoginStateType>(LoginInitialState)

export const getLoginStatus = computed(() => LoginState.status)
export const getLoginError = computed(() => LoginState.error)

export default LoginState
