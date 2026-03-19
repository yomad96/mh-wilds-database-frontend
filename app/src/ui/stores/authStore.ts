import {computed, ref} from "vue";
import {defineStore} from "pinia";
import type {AuthUser} from "@/domain/entities/auth-user.ts";
import type {
    LoginAuthPayload,
    RegisterAuthPayload
} from "@/domain/repositories/authRepositoryInterface.ts";
import {AuthContainer} from "@/containers/auth.container.ts";
import {AuthApiRepository} from "@/infrastructure/authApi.repository.ts";
import LoginState, {
    getLoginError,
    getLoginStatus,
    LoginStatus
} from "@/application/features/auth/login/login.state.ts";
import LogoutState, {
    getLogoutStatus,
    LogoutStatus
} from "@/application/features/auth/logout/logout.state.ts";
import RegisterState, {
    getRegisterError,
    getRegisterStatus,
    RegisterStatus
} from "@/application/features/auth/register/register.state.ts";

export const useAuthStore = defineStore('auth', () => {
    const authRepository = new AuthApiRepository()
    const currentUser = ref<AuthUser | null>(null)
    const initialized = ref(false)

    const loginStatus = computed(() => getLoginStatus.value)
    const loginError = computed(() => getLoginError.value)
    const registerStatus = computed(() => getRegisterStatus.value)
    const registerError = computed(() => getRegisterError.value)
    const logoutStatus = computed(() => getLogoutStatus.value)

    const isAuthenticated = computed(() => currentUser.value !== null)
    const isLoggingIn = computed(() => loginStatus.value === LoginStatus.LOADING)
    const isRegistering = computed(() => registerStatus.value === RegisterStatus.LOADING)

    function resetLoginState(): void {
        LoginState.status = LoginStatus.IDLE
        LoginState.error = null
    }

    function resetRegisterState(): void {
        RegisterState.status = RegisterStatus.IDLE
        RegisterState.error = null
    }

    function resetLogoutState(): void {
        LogoutState.status = LogoutStatus.IDLE
    }

    async function initializeAuth(force = false): Promise<void> {
        if (initialized.value && !force) return

        try {
            const apiUser = await authRepository.getUserFromApi()
            currentUser.value = apiUser
        } catch {
            currentUser.value = null
        } finally {
            initialized.value = true
        }
    }

    async function login(payload: LoginAuthPayload): Promise<boolean> {
        await AuthContainer.loginUseCase.execute(payload)

        if (getLoginStatus.value !== LoginStatus.SUCCESS) {
            return false
        }

        await initializeAuth(true)
        return true
    }

    async function register(payload: RegisterAuthPayload): Promise<boolean> {
        await AuthContainer.registerUseCase.execute(payload)
        return getRegisterStatus.value === RegisterStatus.SUCCESS
    }

    async function logout(): Promise<void> {
        await AuthContainer.logoutUseCase.execute()
        currentUser.value = null
        resetLoginState()
        resetRegisterState()
        resetLogoutState()
        initialized.value = true
    }

    return {
        currentUser,
        initialized,
        loginStatus,
        loginError,
        registerStatus,
        registerError,
        logoutStatus,
        isAuthenticated,
        isLoggingIn,
        isRegistering,
        initializeAuth,
        login,
        register,
        logout,
        resetLoginState,
        resetRegisterState,
        resetLogoutState,
    }
})
