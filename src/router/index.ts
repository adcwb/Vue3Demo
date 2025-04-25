import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import Callback from "@/views/login/Callback.vue";
import LayoutVue from "@/views/base/Layout.vue";

// 静态路由
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            requiresAuth: false
        }
    },
    {
        path: '/callback',
        name: 'Callback',
        component: Callback
    },
    {
        path: '/navbar',
        name: 'Layout',
        component: LayoutVue,
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: '仪表盘',
                    requiresAuth: true,
                    menu: {
                        key: 'dashboard',
                        icon: 'PieChartOutlined',
                        label: '仪表盘'
                    }
                }
            },
            // 其他动态路由将在这里添加
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/error/404.vue'),
        meta: {
            title: '404',
            requiresAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 动态添加路由的函数
export function addDynamicRoutes(menuList: any[]) {
    menuList.forEach(menu => {
        router.addRoute('Layout', {
            path: menu.path,
            component: () => import(`@/views${menu.component}.vue`),
            meta: {
                title: menu.title,
                requiresAuth: true,
                menu: {
                    key: menu.key,
                    icon: menu.icon,
                    label: menu.label
                }
            }
        })
    })
}


// 路由守卫
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    // 设置页面标题
    if (to.meta.title) {
        document.title = `${to.meta.title} - Vue3 Admin` // 设置页面标题
    }

    // 不需要认证的页面直接放行
    if (!to.meta.requiresAuth) {
        return next()
    }

    // 检查 token
    if (!localStorage.getItem("access_token")) {
        return next('/login')
    }

    // // 检查用户信息
    // if (!userStore.userInfo) {
    //     try {
    //         await userStore.getUserInfo()
    //         return next()
    //     } catch (error) {
    //         userStore.resetToken()
    //         message.error('获取用户信息失败，请重新登录')
    //         return next('/login')
    //     }
    // }

    next()
})

export default router