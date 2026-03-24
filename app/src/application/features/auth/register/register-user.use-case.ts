import type {UseCaseInterface} from "@/application/interfaces/use-case.interface.ts";
import type {RegisterUserEvents} from "@/application/features/auth/register/register-user.events.ts";
import type {AuthRepositoryInterface, RegisterUserPayload} from "@/domain/repositories/authRepositoryInterface.ts";

export class RegisterUserUseCase implements UseCaseInterface {
    constructor(
        private authRepository: AuthRepositoryInterface,
        private events: RegisterUserEvents
    ) {}

    async execute(payload: RegisterUserPayload): Promise<void> {
        this.events.loadingStarted()

        try {
            let user = await this.authRepository.registerUser(payload)
            if(user === null) {
                this.events.loadingIsEmpty()
            } else {
                this.events.loadingSucceeded(user)
            }
        } catch (error: any) {
            this.events.loadingFailed(error.message)
        }
    }
}