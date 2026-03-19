import {LoginEvents} from "@/application/features/auth/login/login.events.ts";
import LoginState from "@/application/features/auth/login/login.state.ts";
import {LoginUseCase} from "@/application/features/auth/login/login.use-case.ts";
import {LogoutEvents} from "@/application/features/auth/logout/logout.events.ts";
import LogoutState from "@/application/features/auth/logout/logout.state.ts";
import {LogoutUseCase} from "@/application/features/auth/logout/logout.use-case.ts";
import {RegisterEvents} from "@/application/features/auth/register/register.events.ts";
import RegisterState from "@/application/features/auth/register/register.state.ts";
import {RegisterUseCase} from "@/application/features/auth/register/register.use-case.ts";
import {AuthApiRepository} from "@/infrastructure/authApi.repository.ts";

const repository = new AuthApiRepository()

const loginEvents = new LoginEvents(LoginState)
const loginUseCase = new LoginUseCase(repository, loginEvents)

const registerEvents = new RegisterEvents(RegisterState)
const registerUseCase = new RegisterUseCase(repository, registerEvents)

const logoutEvents = new LogoutEvents(LogoutState)
const logoutUseCase = new LogoutUseCase(repository, logoutEvents)

export const AuthContainer = {
    loginUseCase,
    registerUseCase,
    logoutUseCase,
}
