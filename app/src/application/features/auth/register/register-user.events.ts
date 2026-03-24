import type {User} from "@/domain/entities/user.ts";
import {
    type RegisterUserStateType,
    RegisterUserStatus
} from "@/application/features/auth/register/register-user.state.ts";

export interface RegisterUserEventsInterface {
    loadingStarted(): void;
    loadingSucceeded(user: User): void;
    loadingFailed(error: string): void;
}

export class RegisterUserEvents implements RegisterUserEventsInterface {
    constructor(private state: RegisterUserStateType) {}
    loadingStarted(): void {
        this.state.status = RegisterUserStatus.LOADING;
    }
    loadingSucceeded(user: User): void {
        this.state.status = RegisterUserStatus.SUCCESS
        this.state.user = user
    }

    loadingIsEmpty(): void {
        this.state.status = RegisterUserStatus.EMPTY
        this.state.user = null
    }

    loadingFailed(error: string): void {
        this.state.status = RegisterUserStatus.FAILED
        this.state.error = error
    }
}