import type {UseCaseInterface} from "@/application/interfaces/use-case.interface.ts";
import type {AuthRepositoryInterface} from "@/domain/repositories/authRepositoryInterface.ts";
import type {LogoutEventsInterface} from "@/application/features/auth/logout/logout.events.ts";

export class LogoutUseCase implements UseCaseInterface {
    constructor(
        private authRepository: AuthRepositoryInterface,
        private events: LogoutEventsInterface
    ) {}

    async execute(): Promise<void> {
        this.authRepository.logout()
        this.events.logoutSucceeded()
    }
}
