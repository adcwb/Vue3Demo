import axios from 'axios' //引入axios
import settings from './settings'
import { v4 as uuidv4 } from 'uuid';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = settings.Host + '/api' // 服务端api接口网关地址
axios.defaults.timeout = 25000; // 请求超时时间
axios.defaults.withCredentials = false; // 跨域请求资源的情况下,忽略cookie的发送
let instance = axios.create({})
// http request 拦截器
instance.interceptors.request.use(
    config => {
        //console.log(config);
        var token = localStorage.token || sessionStorage.token;
        if (token) {
            config.headers.Authorization = 'jwt ' + token
        } else {
            console.log('axios拦截器没有找到token');
        }
        if (config.method == 'post') {
            config.data.id = uuidv4()
            config.data.jsonrpc = "2.0"
        }

        return config
    },
    err => {
        return Promise.reject(err)
    })
// http response 拦截器
instance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        if (response.data.code) {
            console.log(response)
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        console.log(error);
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })

export default instance
