import {
    RegisterStatus,
    type RegisterStateType
} from "@/application/features/auth/register/register.state.ts";

export interface RegisterEventsInterface {
    loadingStarted(): void;
    loadingSucceeded(): void;
    loadingFailed(error: string): void;
}

export class RegisterEvents implements RegisterEventsInterface {
    constructor(private state: RegisterStateType) {}

    loadingStarted(): void {
        this.state.status = RegisterStatus.LOADING
        this.state.error = null
    }

    loadingSucceeded(): void {
        this.state.status = RegisterStatus.SUCCESS
        this.state.error = null
    }

    loadingFailed(error: string): void {
        this.state.status = RegisterStatus.FAILED
        this.state.error = error
    }
}
