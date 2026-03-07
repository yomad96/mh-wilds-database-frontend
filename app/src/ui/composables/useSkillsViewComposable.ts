import {computed} from "vue";
import {getListSkillData} from "@/application/features/skill/list-skills/list-skills.state.ts";
import {SkillContainer} from "@/containers/skill.container.ts";

export function useSkillsViewComposable() {
    const filteredSkills = computed(() => {
        return getListSkillData.value
    })

    const getSkills = async () => {
        await SkillContainer.listSkillsUseCase.execute()
    }

    return {
        filteredSkills,
        getSkills,
    }
}
