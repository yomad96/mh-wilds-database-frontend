import {LoginStatus, type LoginStateType} from "@/application/features/auth/login/login.state.ts";

export interface LoginEventsInterface {
    loadingStarted(): void;
    loadingSucceeded(): void;
    loadingFailed(error: string): void;
}

export class LoginEvents implements LoginEventsInterface {
    constructor(private state: LoginStateType) {}

    loadingStarted(): void {
        this.state.status = LoginStatus.LOADING
        this.state.error = null
    }

    loadingSucceeded(): void {
        this.state.status = LoginStatus.SUCCESS
        this.state.error = null
    }

    loadingFailed(error: string): void {
        this.state.status = LoginStatus.FAILED
        this.state.error = error
    }
}
