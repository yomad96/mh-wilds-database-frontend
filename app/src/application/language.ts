export type AppLanguage = 'en' | 'fr'

export const APP_LANGUAGE_STORAGE_KEY = 'app_language'
export const DEFAULT_APP_LANGUAGE: AppLanguage = 'en'

export function getStoredLanguage(): AppLanguage {
    if (typeof window === 'undefined') {
        return DEFAULT_APP_LANGUAGE
    }

    const value = window.localStorage.getItem(APP_LANGUAGE_STORAGE_KEY)
    return value === 'fr' ? 'fr' : DEFAULT_APP_LANGUAGE
}

export function setStoredLanguage(language: AppLanguage): void {
    if (typeof window === 'undefined') {
        return
    }

    window.localStorage.setItem(APP_LANGUAGE_STORAGE_KEY, language)
}
