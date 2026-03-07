import type {UseCaseInterface} from "@/application/interfaces/use-case.interface.ts";
import type {CharmRepositoryInterface} from "@/domain/repositories/charmRepositoryInterface.ts";
import type {ListCharmsEventsInterface} from "@/application/features/charm/list-charms/list-charms.events.ts";

export class ListCharmsUseCase implements UseCaseInterface {
    constructor(
        private charmRepository: CharmRepositoryInterface,
        private events: ListCharmsEventsInterface
    ) {}

    async execute(): Promise<void> {
        this.events.loadingStarted()

        try {
            let charms = await this.charmRepository.getCharms()
            if(charms.length === 0) {
                this.events.loadingIsEmpty()
            } else {
                this.events.loadingSucceeded(charms)
            }
        } catch (error: any) {
            this.events.loadingFailed(error.message)
        }
    }
}