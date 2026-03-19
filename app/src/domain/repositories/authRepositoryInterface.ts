import type {AuthUser} from "@/domain/entities/auth-user.ts";

export interface RegisterAuthPayload {
    email: string
    password: string
    displayName: string
}

export interface LoginAuthPayload {
    email: string
    password: string
}

export type AuthUserSource = 'jwt' | 'me'

export interface AuthRepositoryInterface {
    register(payload: RegisterAuthPayload): Promise<void>;
    login(payload: LoginAuthPayload): Promise<void>;
    logout(): Promise<void>;
    getStoredToken(): string | null;
    getUserFromToken(): AuthUser | null;
    getUserFromApi(): Promise<AuthUser | null>;
}
