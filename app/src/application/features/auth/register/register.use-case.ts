import type {UseCaseInterface} from "@/application/interfaces/use-case.interface.ts";
import type {
    AuthRepositoryInterface,
    RegisterAuthPayload
} from "@/domain/repositories/authRepositoryInterface.ts";
import type {RegisterEventsInterface} from "@/application/features/auth/register/register.events.ts";

export class RegisterUseCase implements UseCaseInterface {
    constructor(
        private authRepository: AuthRepositoryInterface,
        private events: RegisterEventsInterface
    ) {}

    async execute(payload: RegisterAuthPayload): Promise<void> {
        this.events.loadingStarted()

        try {
            await this.authRepository.register(payload)
            this.events.loadingSucceeded()
        } catch (error: unknown) {
            this.events.loadingFailed(error instanceof Error ? error.message : "L'inscription a échoué")
        }
    }
}
