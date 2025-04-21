import type { StorageType } from '@/types/auth'

// Token 存储方式
const TOKEN_STORAGE: StorageType = 'localStorage' // 可选 'localStorage' | 'sessionStorage'

export const getToken = (): string | null => {
    return window[TOKEN_STORAGE].getItem('token')
}

export const setToken = (token: string): void => {
    window[TOKEN_STORAGE].setItem('token', token)
}

export const removeToken = (): void => {
    window[TOKEN_STORAGE].removeItem('token')
}

// 添加类型定义
declare global {
    interface Window {
        localStorage: Storage
        sessionStorage: Storage
    }
}