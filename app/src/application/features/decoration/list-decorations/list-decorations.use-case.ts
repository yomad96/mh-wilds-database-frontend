import type {ListeAppareancesEventsInterface} from "@/application/features/decoration/list-decorations/list-decorations.events.ts";
import type {UseCaseInterface} from "@/application/interfaces/use-case.interface.ts";
import type {DecoratorRepositoryInterface} from "@/domain/repositories/decorationRepositoryInterface.ts";

export class ListDecorationsUseCase implements UseCaseInterface {
    constructor(
        private decorationRepository: DecoratorRepositoryInterface,
        private events: ListeAppareancesEventsInterface
    ) {}

    async execute(): Promise<void> {
        this.events.loadingStarted()

        try {
            let decorations = await this.decorationRepository.getDecorations()
            console.log(decorations)
            if(decorations.length === 0) {
                this.events.loadingIsEmpty()
            } else {
                this.events.loadingSucceeded(decorations)
            }
        } catch (error: any) {
            this.events.loadingFailed(error.message)
        }
    }
}