import {computed, reactive} from "vue";

export enum RegisterStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed'
}

export type RegisterStateType = {
    status: RegisterStatus
    error: string | null
}

const RegisterInitialState: RegisterStateType = {
    status: RegisterStatus.IDLE,
    error: null
}

const RegisterState = reactive<RegisterStateType>(RegisterInitialState)

export const getRegisterStatus = computed(() => RegisterState.status)
export const getRegisterError = computed(() => RegisterState.error)

export default RegisterState
