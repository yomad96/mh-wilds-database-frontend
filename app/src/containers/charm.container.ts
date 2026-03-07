import {DecorationApiRepository} from "@/infrastructure/decorationApi.repository.ts";
import {ListDecorationsUseCase} from "@/application/features/decoration/list-decorations/list-decorations.use-case.ts";
import {ListDecorationsEvents} from "@/application/features/decoration/list-decorations/list-decorations.events.ts";
import ListDecorationState from "@/application/features/decoration/list-decorations/list-decorations.state.ts";
import {CharmApiRepository} from "@/infrastructure/charmApi.repository.ts";
import {ListCharmsEvents} from "@/application/features/charm/list-charms/list-charms.events.ts";
import ListCharmState from "@/application/features/charm/list-charms/list-charms.state.ts";
import {ListCharmsUseCase} from "@/application/features/charm/list-charms/list-charms.use-case.ts";

const repository = new CharmApiRepository();

const listCharmsEvents = new ListCharmsEvents(ListCharmState)
const listCharmsUseCase = new ListCharmsUseCase(repository, listCharmsEvents)

export const CharmContainer = {
    listCharmsUseCase: listCharmsUseCase,
}