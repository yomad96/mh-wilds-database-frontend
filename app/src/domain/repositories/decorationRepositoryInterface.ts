import type {Decoration} from "@/domain/entities/decoration.ts";

export interface DecoratorRepositoryInterface {
    getDecorations(): Promise<Decoration[]>;
}