// 用户登录参数
export interface LoginParams {
    username: string
    password: string
    captcha?: string
}

// Casdoor Callback
export interface UserCallback {
    code: string
    state: string
}

// 用户信息
export interface UserInfo {
    id: number
    username: string
    nickname: string
    avatar: string
    roles: string[]
    permissions: string[]
}