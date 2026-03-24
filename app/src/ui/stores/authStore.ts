import {defineStore} from "pinia";
import {AuthContainer} from "@/containers/auth.container.ts";
import type {RegisterUserPayload} from "@/domain/repositories/authRepositoryInterface.ts";

export const useAuthStore = defineStore('authStore', () => {
    async function register(payload: RegisterUserPayload): Promise<void> {
        await AuthContainer.registerUserUseCase.execute(payload)
    }

    return {
        register
    }
})