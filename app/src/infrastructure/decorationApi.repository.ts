import type {DecoratorRepositoryInterface} from "@/domain/repositories/decorationRepositoryInterface.ts";
import type {Decoration} from "@/domain/entities/decoration.ts";
import {useApiComposable} from "@/infrastructure/useApiComposable.ts";

export class DecorationApiRepository implements DecoratorRepositoryInterface {
    private api = useApiComposable('http://localhost:8000/api')

    async getDecorations(): Promise<Decoration[]> {
        try {
            const response = await this.api.request<Decoration[]>('/decorations')
            // @ts-ignore
            return response.data['member'] ?? []
        } catch (error) {
            console.error("Error fetching decorations:", error)
            throw new Error("Failed to fetch decorations")
        }
    }
}