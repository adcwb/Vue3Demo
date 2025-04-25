<template>
  <!-- 使用 Ant Design Vue 的 Layout 组件，设置最小高度为 100vh 确保占满整个视口 -->
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏区域 -->
    <a-layout-sider
      v-model:collapsed="collapsed"  <!-- 双向绑定侧边栏折叠状态 -->
      :trigger="null"                <!-- 不显示默认的折叠触发器 -->
      collapsible                    <!-- 允许折叠 -->
      breakpoint="lg"                <!-- 响应式断点，屏幕宽度小于 lg 时自动折叠 -->
      :width="220"                   <!-- 侧边栏宽度 -->
      theme="dark"                   <!-- 使用暗色主题 -->
    >
      <!-- 侧边栏顶部 Logo 区域 -->
      <div class="logo">
        <!-- 根据折叠状态显示不同的文字 -->
        <h2 v-if="!collapsed">Vue Demo</h2>
        <h2 v-else>YS</h2>
      </div>
      
      <!-- 侧边栏菜单 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"  <!-- 双向绑定选中的菜单项 -->
        theme="dark"                         <!-- 暗色主题 -->
        mode="inline"                        <!-- 内嵌模式 -->
        @click="handleMenuClick"             <!-- 点击菜单项事件处理 -->
      >
        <!-- 仪表盘菜单项 -->
        <a-menu-item key="dashboard">
          <template #icon>
            <PieChartOutlined />            <!-- 使用图表图标 -->
          </template>
          <span>仪表盘</span>
        </a-menu-item>
        
        <!-- 用户管理菜单项 -->
        <a-menu-item key="users">
          <template #icon>
            <UserOutlined />                <!-- 使用用户图标 -->
          </template>
          <span>用户管理</span>
        </a-menu-item>
        
        <!-- 系统设置菜单项 -->
        <a-menu-item key="settings">
          <template #icon>
            <SettingOutlined />             <!-- 使用设置图标 -->
          </template>
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 主内容区域 -->
    <a-layout>
      <!-- 顶部导航栏 -->
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header-content">
          <!-- 折叠/展开侧边栏的触发器图标 -->
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          
          <!-- 用户信息区域 -->
          <div class="user-info">
            <a-dropdown>
              <!-- 下拉菜单触发器 -->
              <a class="ant-dropdown-link" @click.prevent>
                <UserOutlined />                      <!-- 用户图标 -->
                <span style="margin-left: 8px">{{ authStore.userInfo?.username }}</span>  <!-- 显示用户名 -->
                <DownOutlined />                     <!-- 下拉箭头图标 -->
              </a>
              <!-- 下拉菜单内容 -->
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="handleLogout">  <!-- 退出登录选项 -->
                    <LogoutOutlined />                <!-- 退出图标 -->
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>

      <!-- 主内容区域 -->
      <a-layout-content style="margin: 24px 16px 0">
        <!-- 内容容器，设置内边距和背景色 -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <!-- 路由视图，显示当前路由对应的组件 -->
          <router-view />
        </div>
      </a-layout-content>

      <!-- 页脚区域 -->
      <a-layout-footer style="text-align: center">
        Vue Demo ©2025 版权所有
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
// 导入 Vue 相关 API
import { ref } from 'vue';
// 导入路由相关
import { useRouter } from 'vue-router';
// 导入 Pinia 用户状态存储
import { useUserStore } from '@/stores/user';
// 导入 Ant Design Vue 图标组件
import {
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';

// 获取路由实例
const router = useRouter();
// 获取用户状态存储实例
const authStore = useUserStore();

// 定义响应式变量
const selectedKeys = ref<string[]>(['dashboard']);  // 当前选中的菜单项 key
const collapsed = ref(false);                     // 侧边栏是否折叠

/**
 * 处理菜单点击事件
 * @param key - 被点击菜单项的 key
 */
const handleMenuClick = ({ key }: { key: string }) => {
  selectedKeys.value = [key];      // 更新选中的菜单项
  router.push(`/${key}`);          // 跳转到对应路由
};

/**
 * 处理退出登录
 */
const handleLogout = async () => {
  await authStore.logout();        // 调用退出登录方法
  await router.push('/login');    // 跳转到登录页
};

// 初始化时跳转到仪表盘页面
router.push('/dashboard');
</script>

<style lang="scss" scoped>
/* Logo 区域样式 */
.logo {
  height: 64px;                   /* 固定高度 */
  display: flex;
  align-items: center;            /* 垂直居中 */
  justify-content: center;        /* 水平居中 */
  color: #fff;                    /* 白色文字 */
  font-size: 18px;                /* 字体大小 */
  background: rgba(255, 255, 255, 0.1);  /* 半透明背景 */
}

/* 顶部导航栏内容区域样式 */
.header-content {
  display: flex;
  justify-content: space-between; /* 两端对齐 */
  align-items: center;            /* 垂直居中 */
  padding: 0 24px;                /* 左右内边距 */
}

/* 折叠触发器样式 */
.trigger {
  font-size: 18px;                /* 图标大小 */
  cursor: pointer;                /* 鼠标手型 */
  transition: color 0.3s;         /* 颜色过渡动画 */
}

/* 折叠触发器悬停效果 */
.trigger:hover {
  color: #1890ff;                 /* 悬停时变为蓝色 */
}

/* 用户信息区域样式 */
.user-info {
  cursor: pointer;                /* 鼠标手型 */
}
</style>