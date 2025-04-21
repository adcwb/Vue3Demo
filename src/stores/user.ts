import { defineStore } from 'pinia'
import { login, getUserInfo, logout } from '@/api/user'
import type { UserInfo, LoginParams } from '@/types/user'
import { removeToken, setToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userInfo: null as UserInfo | null
    }),

    actions: {
        // 用户登录
        async login(loginForm: LoginParams) {
            try {
                const token = await login(loginForm)
                this.token = token
                setToken(token)
                return this.getUserInfo()
            } catch (error) {
                return Promise.reject(error)
            }
        },

        // 获取用户信息
        async getUserInfo() {
            try {
                const userInfo = await getUserInfo()
                this.userInfo = userInfo
                return userInfo
            } catch (error) {
                return Promise.reject(error)
            }
        },

        // 退出登录
        async logout() {
            try {
                await logout()
                this.resetToken()
            } catch (error) {
                return Promise.reject(error)
            }
        },

        // 重置 token
        resetToken() {
            this.token = ''
            this.userInfo = null
            removeToken()
        }
    }
})