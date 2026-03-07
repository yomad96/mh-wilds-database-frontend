import {useApiComposable} from "@/infrastructure/useApiComposable.ts";
import type {CharmRepositoryInterface} from "@/domain/repositories/charmRepositoryInterface.ts";
import type {Charm} from "@/domain/entities/charm.ts";

export class CharmApiRepository implements CharmRepositoryInterface {
    private api = useApiComposable('http://localhost:8000/api')

    async getCharms(): Promise<Charm[]> {
        try {
            const response = await this.api.request<Charm[]>('/charms')
            // @ts-ignore
            return response.data['member'] ?? []
        } catch (error) {
            console.error("Error fetching charms:", error)
            throw new Error("Failed to fetch charms")
        }
    }
}