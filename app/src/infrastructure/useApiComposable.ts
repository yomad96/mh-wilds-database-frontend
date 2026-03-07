import {getStoredLanguage} from "@/application/language.ts";

export interface ApiResponse<T> {
    data: T | null
    error: Error | null
    status: number | null
}

export function useApiComposable(baseUrl: string) {
    async function request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        try {
            const language = getStoredLanguage()
            const url = `${baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}lang=${language}`

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    ...(options.headers || {})
                },
                ...options
            })

            const status = response.status

            if (!response.ok) {
                throw new Error(`HTTP error ${status}`)
            }

            const data: T = await response.json()

            return {
                data,
                error: null,
                status
            }
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error : new Error('Unknown error'),
                status: null
            }
        }
    }

    return {
        request
    }
}
