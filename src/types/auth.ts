export type StorageType = 'localStorage' | 'sessionStorage'

export interface AuthStorage {
    getToken: () => string | null
    setToken: (token: string) => void
    removeToken: () => void
}