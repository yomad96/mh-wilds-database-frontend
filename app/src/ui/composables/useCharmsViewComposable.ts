import {computed} from "vue";
import {getListCharmData} from "@/application/features/charm/list-charms/list-charms.state.ts";
import {CharmContainer} from "@/containers/charm.container.ts";

export function useCharmsViewComposable() {
    const filteredCharms = computed(() => {
        return getListCharmData.value
    })

    const getCharms = async () => {
        await CharmContainer.listCharmsUseCase.execute()
    }

    return {
        filteredCharms,
        getCharms,
    }
}