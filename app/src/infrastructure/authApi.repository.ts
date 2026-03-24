import type {AuthRepositoryInterface, RegisterUserPayload} from "@/domain/repositories/authRepositoryInterface.ts";
import type {User} from "@/domain/entities/user.ts";

export class AuthApiRepository implements AuthRepositoryInterface {
    isAuthenticated(): boolean {
        return false;
    }

    registerUser(registerUserPayload: RegisterUserPayload): Promise<User | null> {
        return Promise.resolve(null);
    }
}