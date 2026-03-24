import type {User} from "@/domain/entities/user.ts";

export interface RegisterUserPayload {
    email: string
    password: string
    displayName: string
}

export interface AuthRepositoryInterface {
    isAuthenticated(): boolean;
    registerUser(registerUserPayload: RegisterUserPayload): Promise<User|null>;
}