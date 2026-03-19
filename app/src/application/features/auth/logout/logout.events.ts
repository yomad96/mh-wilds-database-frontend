import {LogoutStatus, type LogoutStateType} from "@/application/features/auth/logout/logout.state.ts";

export interface LogoutEventsInterface {
    logoutSucceeded(): void;
}

export class LogoutEvents implements LogoutEventsInterface {
    constructor(private state: LogoutStateType) {}

    logoutSucceeded(): void {
        this.state.status = LogoutStatus.SUCCESS
    }
}
