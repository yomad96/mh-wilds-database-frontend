import type {Charm} from "@/domain/entities/charm.ts";

export interface CharmRepositoryInterface {
    getCharms(): Promise<Charm[]>;
}