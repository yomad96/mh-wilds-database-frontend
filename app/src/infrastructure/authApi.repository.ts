import {useApiComposable} from "@/infrastructure/useApiComposable.ts";
import type {
    AuthRepositoryInterface,
    LoginAuthPayload,
    RegisterAuthPayload
} from "@/domain/repositories/authRepositoryInterface.ts";
import type {AuthUser} from "@/domain/entities/auth-user.ts";
import {getApiBaseUrl} from "@/infrastructure/api.config.ts";

type JsonObject = Record<string, unknown>

export class AuthApiRepository implements AuthRepositoryInterface {
    private api = useApiComposable(getApiBaseUrl())

    async register(payload: RegisterAuthPayload): Promise<void> {
        const response = await this.api.request<JsonObject>('/api/register', {
            method: 'POST',
            body: JSON.stringify(payload)
        })

        if (response.error) {
            throw new Error(this.extractMessage(response.error.message, "L'inscription a échoué"))
        }
    }

    async login(payload: LoginAuthPayload): Promise<void> {
        const response = await this.api.request<JsonObject>('/api/login_check', {
            method: 'POST',
            body: JSON.stringify({
                username: payload.email,
                password: payload.password
            })
        })

        if (response.error) {
            throw new Error(this.extractMessage(response.error?.message, 'La connexion a échoué'))
        }
    }

    async logout(): Promise<void> {
        const response = await this.api.request<JsonObject>('/api/logout', {
            method: 'POST'
        })

        if (response.error) {
            throw new Error(this.extractMessage(response.error.message, 'La déconnexion a échoué'))
        }
    }

    getStoredToken(): string | null {
        return null
    }

    getUserFromToken(): AuthUser | null {
        return null
    }

    async getUserFromApi(): Promise<AuthUser | null> {
        const response = await this.api.request<JsonObject>('/api/me')
        if (response.error || !response.data) {
            throw new Error(this.extractMessage(response.error?.message, "Impossible de récupérer l'utilisateur connecté"))
        }

        const data = response.data
        const displayNameCandidate = data.displayName ?? data.name
        const rolesCandidate = data.roles
        const emailCandidate = data.email

        return {
            displayName: typeof displayNameCandidate === 'string' ? displayNameCandidate : null,
            roles: Array.isArray(rolesCandidate)
                ? rolesCandidate.filter((role): role is string => typeof role === 'string')
                : [],
            email: typeof emailCandidate === 'string' ? emailCandidate : null,
            raw: data
        }
    }

    private extractMessage(raw: string | undefined, fallbackMessage: string): string {
        if (!raw) return fallbackMessage
        if (raw.startsWith('HTTP error')) return fallbackMessage
        return raw
    }
}
