import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import '@/styles/index.scss'

import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

// 全局注册公共组件
app.component('CommonHeader', CommonHeader)
app.component('CommonFooter', CommonFooter)

app.mount('#app')