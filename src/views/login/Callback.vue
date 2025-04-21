<template>
  <!-- 回调页面容器 -->
  <div class="callback-container">
    <!-- 使用Ant Design的结果组件展示处理状态 -->
    <!-- :title 主标题，动态显示处理状态  -->
    <!-- :sub-title副标题，显示详细说明 -->
    <!-- :status状态图标类型：info/success/error -->
    <a-result
        :title="resultTitle"
        :sub-title="resultSubTitle"
        :status="resultStatus"
    >
      <!-- 额外操作区域 -->
      <template #extra>
        <!-- 返回登录页按钮（仅在登录失败时出现） -->
        <a-button
            type="primary"
            @click="handleBackToLogin"
            v-if="showBackButton"
        >
          返回登录页
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';           // 导入Vue相关功能
import { useRouter } from 'vue-router';         // 导入路由功能
import { message } from 'ant-design-vue';       // 导入Ant Design的消息提示组件
import { CasdoorCallback } from '@/api/user';   // 导入Casdoor回调API

// 获取路由实例
const router = useRouter();

// 定义响应式状态变量
const resultTitle = ref('正在处理登录...');                           // 结果标题
const resultSubTitle = ref('请稍候，我们正在验证您的登录信息');           // 结果副标题
const resultStatus = ref('info');                                   // 状态类型
const showBackButton = ref(false);                                  // 是否显示返回按钮

/**
* Token数据结构定义
* @property {string} access_token - 访问令牌
* @property {string} refresh_token - 刷新令牌
* @property {string} token_type - 令牌类型
* @property {string} expiry - 过期时间
*/
interface TokenData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expiry: string;
}

/**
* 处理Casdoor回调的核心函数
* 1. 从URL获取认证参数
* 2. 调用后端API验证
* 3. 处理响应结果
*/
const handleCallback = async () => {
  try {
    // 从当前URL的查询参数中获取code和state
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    // 验证必要参数
    if (!code || !state) {
      throw new Error('缺少必要的认证参数: code和state必须提供');
    }

    // 准备回调数据对象
    const UserCallback = {
      code,
      state
    };

    // 调用后端API进行认证验证
    const response = await CasdoorCallback(UserCallback);

    // 处理响应数据
    if (response && response.token) {
      // 存储令牌到本地存储
      localStorage.setItem('access_token', response.token.access_token);
      localStorage.setItem('refresh_token', response.token.refresh_token);
      localStorage.setItem('token_type', response.token.token_type);
      localStorage.setItem('expiry', response.token.expiry);

      // 更新UI状态为成功
      resultTitle.value = '登录成功';
      resultSubTitle.value = '您已成功通过Casdoor认证';
      resultStatus.value = 'success';

      // 添加跳转前的延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 使用replace而不是push避免回退到登录页
      router.replace('/dashboard')
          .then(() => message.success('跳转成功'))
          .catch(err => {
            message.error('跳转失败:', err);
            // 跳转失败时显示返回按钮
            showBackButton.value = true;
          });
    } else {
      // 无效响应处理
      message.warning('无效的响应数据');
    }
  } catch (error) {
    // 错误处理，类型断言为 Error
    if (error instanceof Error) {
      // 已知错误处理
      console.log(error);
      console.error('Casdoor回调处理失败:', error);

      // 更新UI状态
      resultTitle.value = '登录失败';
      resultSubTitle.value = error.message || '处理登录回调时发生错误';
      resultStatus.value = 'error';
      showBackButton.value = true;                                        // 显示返回按钮

      // 显示错误提示
      message.error('登录失败: ' + (error.message || '未知错误'));

    } else {
      // 未知错误类型处理
      console.error('未知错误:', error);
      message.error('登录失败: 请联系管理员或在线客服~');
    }
  }
};

/**
 * 返回登录页的处理函数
 */
const handleBackToLogin = () => {
  // 跳转到登录页
  router.push('/login');
};


// 组件挂载时自动执行回调处理
onMounted(() => {
  handleCallback();
});
</script>

<style scoped>
/* 回调页面容器样式 */
.callback-container {
  display: flex;              /* 弹性布局 */
  justify-content: center;    /* 水平居中 */
  align-items: center;        /* 垂直居中 */
  height: 100vh;              /* 全屏高度 */
  padding: 20px;              /* 内边距 */
  background: #f0f2f5;        /* 背景色 */
}
</style>