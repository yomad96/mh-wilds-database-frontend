import {DecorationApiRepository} from "@/infrastructure/decorationApi.repository.ts";
import {ListDecorationsUseCase} from "@/application/features/decoration/list-decorations/list-decorations.use-case.ts";
import {ListDecorationsEvents} from "@/application/features/decoration/list-decorations/list-decorations.events.ts";
import ListDecorationState from "@/application/features/decoration/list-decorations/list-decorations.state.ts";

const repository = new DecorationApiRepository();

const listDecorationsEvents = new ListDecorationsEvents(ListDecorationState)
const listDecorationsUseCase = new ListDecorationsUseCase(repository, listDecorationsEvents)



export const DecorationContainer = {
    listDecorationsUseCase: listDecorationsUseCase,
}