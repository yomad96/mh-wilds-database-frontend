import {SkillApiRepository} from "@/infrastructure/skillApi.repository.ts";
import ListSkillState from "@/application/features/skill/list-skills/list-skills.state.ts";
import {ListSkillsEvents} from "@/application/features/skill/list-skills/list-skills.events.ts";
import {ListSkillsUseCase} from "@/application/features/skill/list-skills/list-skills.use-case.ts";

const repository = new SkillApiRepository();

const listSkillsEvents = new ListSkillsEvents(ListSkillState)
const listSkillsUseCase = new ListSkillsUseCase(repository, listSkillsEvents)

export const SkillContainer = {
    listSkillsUseCase: listSkillsUseCase,
}
