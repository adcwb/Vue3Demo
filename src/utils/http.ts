import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'

// 定义接口返回数据类型
export interface ResponseData<T = any> {
    code: number
    data: T
    message: string
}

class HttpClient {
    private instance: AxiosInstance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.setupInterceptors()
    }

    // 设置拦截器
    private setupInterceptors() {
        // 请求拦截
        this.instance.interceptors.request.use(
            (config) => {
                const userStore = useUserStore()
                if (userStore.token) {
                    config.headers!['Authorization'] = `Bearer ${userStore.token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // 响应拦截
        this.instance.interceptors.response.use(
            (response: AxiosResponse<ResponseData>) => {

                const res = response.data
                if (res.code !== 200) {
                    message.error(res.message || 'Error')
                    return Promise.reject(new Error(res.message || 'Error'))
                }
                return res.data
            },
            (error) => {
                message.error(error.message || 'Request Error')
                return Promise.reject(error)
            }
        )
    }

    // 通用请求方法
    public request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config)
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get(url, config)
    }

    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post(url, data, config)
    }

    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.put(url, data, config)
    }

    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.delete(url, config)
    }
}

// 创建实例
const http = new HttpClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

export default http