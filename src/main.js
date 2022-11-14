import { createApp } from 'vue'
// 引入Antd组件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Axios组件
import axios from './axios'
// 引入自定义配置文件
import settings from './settings'

import * as antIcons from '@ant-design/icons-vue' // 引入ant icons
const antIconsList = antIcons; // 重新赋值定义类型 避免后续遍历注册组件的时候ts报错
// 注册组件
// Object.keys(antIconsList).forEach(key => {
//     app.component(key, antIconsList[key])
// })
const app = createApp(App)

for (const key in antIconsList) {
    app.component(key, antIconsList[key])
}
app.config.globalProperties.$antIcons = antIcons; // 挂在到vue实例上


app.config.globalProperties.$axios = axios
app.config.globalProperties.$setting = settings
app.config.productionTip = false

app.use(store).use(router).use(Antd).mount('#app')
