import {ListCharmsStatus, type ListCharmStateType} from "@/application/features/charm/list-charms/list-charms.state.ts";
import type {Charm} from "@/domain/entities/charm.ts";

export interface ListCharmsEventsInterface {
    loadingStarted(): void;
    loadingIsEmpty(): void;
    loadingSucceeded(charms: Charm[]): void;
    loadingFailed(error: string): void;
}

export class ListCharmsEvents implements ListCharmsEventsInterface {
    constructor(private state: ListCharmStateType) {}
    loadingStarted(): void {
        this.state.status = ListCharmsStatus.LOADING;
    }
    loadingSucceeded(charms: Charm[]): void {
        this.state.status = ListCharmsStatus.SUCCESS
        this.state.charms = charms
    }

    loadingIsEmpty(): void {
        this.state.status = ListCharmsStatus.EMPTY
        this.state.charms = []
    }

    loadingFailed(error: string): void {
        this.state.status = ListCharmsStatus.FAILED
        this.state.error = error
    }
}