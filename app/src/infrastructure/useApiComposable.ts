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
            const url = `${baseUrl}${endpoint}`
            // const url = `${baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}lang=${language}`
            const headers = new Headers(options.headers || {})

            if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
                headers.set('Content-Type', 'application/json')
            }
            // headers.set('Accept-Language', language)

            const response = await fetch(url, {
                credentials: 'include',
                headers,
                ...options
            })

            const status = response.status

            if (!response.ok) {
                throw new Error(`HTTP error ${status}`)
            }

            const contentType = response.headers.get('Content-Type') ?? ''
            const data = contentType.includes('application/json')
                ? await response.json() as T
                : null

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
