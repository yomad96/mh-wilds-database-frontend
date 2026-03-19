export interface AuthUser {
    displayName: string | null
    roles: string[]
    email: string | null
    raw?: unknown
}
