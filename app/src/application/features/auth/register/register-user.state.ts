import {computed, reactive} from "vue";
import type {User} from "@/domain/entities/user.ts";

export enum RegisterUserStatus {
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed",
    EMPTY = "empty"
}

export type RegisterUserStateType = {
    status: RegisterUserStatus
    user: User | null;
    error: string | null;
}

const RegisterUserInitialState: RegisterUserStateType = {
    status: RegisterUserStatus.EMPTY,
    user: null,
    error: null
}

const RegisterUserState = reactive<RegisterUserStateType>(RegisterUserInitialState)


export const getRegisterUserStatus = computed(() => RegisterUserState.status)
export const getRegisterUserData = computed(() => RegisterUserState.user)
export const getRegisterUserError = computed(() => RegisterUserState.error)

export default RegisterUserState