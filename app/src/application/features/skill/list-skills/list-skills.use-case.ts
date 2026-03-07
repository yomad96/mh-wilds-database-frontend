import type {UseCaseInterface} from "@/application/interfaces/use-case.interface.ts";
import type {ListSkillsEventsInterface} from "@/application/features/skill/list-skills/list-skills.events.ts";
import type {SkillRepositoryInterface} from "@/domain/repositories/skillRepositoryInterface.ts";

export class ListSkillsUseCase implements UseCaseInterface {
    constructor(
        private skillRepository: SkillRepositoryInterface,
        private events: ListSkillsEventsInterface
    ) {}

    async execute(): Promise<void> {
        this.events.loadingStarted()

        try {
            let skills = await this.skillRepository.getSkills()
            if(skills.length === 0) {
                this.events.loadingIsEmpty()
            } else {
                this.events.loadingSucceeded(skills)
            }
        } catch (error: any) {
            this.events.loadingFailed(error.message)
        }
    }
}
