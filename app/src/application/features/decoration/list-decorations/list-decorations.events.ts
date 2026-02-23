import type {Decoration} from "@/domain/entities/decoration.ts";
import {
    type ListDecorationStateType,
    ListDecorationStatus
} from "@/application/features/decoration/list-decorations/list-decorations.state.ts";

export interface ListeAppareancesEventsInterface {
    loadingStarted(): void;
    loadingIsEmpty(): void;
    loadingSucceeded(decorations: Decoration[]): void;
    loadingFailed(error: string): void;
}

export class ListDecorationsEvents implements ListeAppareancesEventsInterface {
    constructor(private state: ListDecorationStateType) {}
    loadingStarted(): void {
        this.state.status = ListDecorationStatus.LOADING;
    }
    loadingSucceeded(decorations: Decoration[]): void {
        this.state.status = ListDecorationStatus.SUCCESS
        this.state.decorations = decorations
    }

    loadingIsEmpty(): void {
        this.state.status = ListDecorationStatus.EMPTY
        this.state.decorations = []
    }

    loadingFailed(error: string): void {
        this.state.status = ListDecorationStatus.FAILED
        this.state.error = error
    }
}