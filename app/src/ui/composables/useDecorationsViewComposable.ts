import {computed} from "vue";
import {DecorationContainer} from "@/containers/decoration.container.ts";
import {getListDecorationData} from "@/application/features/decoration/list-decorations/list-decorations.state.ts";

export function useDecorationsViewComposable() {
    const filteredDecorations = computed(() => {
        return getListDecorationData.value
    })

    const getDecorations = async () => {
        await DecorationContainer.listDecorationsUseCase.execute()
    }

    return {
        filteredDecorations,
        getDecorations,
    }
}