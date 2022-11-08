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

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$setting = settings
app.config.productionTip = false

app.use(store).use(router).use(Antd).mount('#app')
