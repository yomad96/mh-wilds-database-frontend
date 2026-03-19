import type {UseCaseInterface} from "@/application/interfaces/use-case.interface.ts";
import type {
    AuthRepositoryInterface,
    LoginAuthPayload
} from "@/domain/repositories/authRepositoryInterface.ts";
import type {LoginEventsInterface} from "@/application/features/auth/login/login.events.ts";

export class LoginUseCase implements UseCaseInterface {
    constructor(
        private authRepository: AuthRepositoryInterface,
        private events: LoginEventsInterface
    ) {}

    async execute(payload: LoginAuthPayload): Promise<void> {
        this.events.loadingStarted()

        try {
            await this.authRepository.login(payload)
            this.events.loadingSucceeded()
        } catch (error: unknown) {
            this.events.loadingFailed(error instanceof Error ? error.message : 'La connexion a échoué')
        }
    }
}
