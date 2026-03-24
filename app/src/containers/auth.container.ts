import {AuthApiRepository} from "@/infrastructure/authApi.repository.ts";
import {RegisterUserEvents} from "@/application/features/auth/register/register-user.events.ts";
import RegisterUserState from "@/application/features/auth/register/register-user.state.ts";
import {RegisterUserUseCase} from "@/application/features/auth/register/register-user.use-case.ts";

const repository = new AuthApiRepository();

const registerUserEvents = new RegisterUserEvents(RegisterUserState)
const registerUserUseCase = new RegisterUserUseCase(repository, registerUserEvents)

export const AuthContainer = {
    registerUserUseCase: registerUserUseCase,
}