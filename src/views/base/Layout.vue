<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        breakpoint="lg"
        :width="220"
        theme="dark"
    >
      <div class="logo">
        <h2 v-if="!collapsed">Vue Demo</h2>
        <h2 v-else>YS</h2>
      </div>
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
          @click="handleMenuClick"
      >
        <a-menu-item key="dashboard">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>仪表盘</span>
        </a-menu-item>
        <a-menu-item key="users">
          <template #icon>
            <UserOutlined />
          </template>
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="settings">
          <template #icon>
            <SettingOutlined />
          </template>
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 主内容区 -->
    <a-layout>
      <!-- 顶部导航 -->
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header-content">
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
          <div class="user-info">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <UserOutlined />
                <span style="margin-left: 8px">{{ authStore.user?.username }}</span>
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="handleLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>

      <!-- 内容区 -->
      <a-layout-content style="margin: 24px 16px 0">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer style="text-align: center">
        Vue Demo ©2025 版权所有
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import {
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const authStore = useUserStore();

const selectedKeys = ref<string[]>(['dashboard']);
const collapsed = ref(false);

// 菜单点击处理
const handleMenuClick = ({ key }: { key: string }) => {
  selectedKeys.value = [key];
  router.push(`/${key}`);
};

const handleLogout = async () => {
  await authStore.logout();
  await router.push('/login');
};

// 初始化时设置默认路由
router.push('/dashboard');
</script>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.user-info {
  cursor: pointer;
}
</style>