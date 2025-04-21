import http from '@/utils/http'
import {UserInfo, LoginParams, UserCallback} from '@/types/user'

// 用户登录
export const login = (data: LoginParams) => {
    return http.post<string>('/user/login', data)
}

// 获取用户信息
export const getUserInfo = () => {
    return http.get<UserInfo>('/user/info')
}

// Casdoor三方登录回调
export const CasdoorCallback = (data: UserCallback) => {
    return http.post('/users/callback',  data)
}


// 退出登录
export const logout = () => {
    return http.post('/user/logout')
}