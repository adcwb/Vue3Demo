<template>
  <div class="login-container">
    <!-- 背景层 -->
    <div class="login-bg"></div>

    <!-- 登录注册表单容器 -->
    <div class="login-wrapper">
      <!-- 登录注册卡片（向右浮动） -->
      <div class="login-card">
        <!-- 标题区域 -->
        <div class="login-header">
          <h2>Vue3 Demo</h2>
        </div>

        <!-- 登录/注册选项卡 -->
        <div class="login-tabs">
          <div
              class="tab-item"
              :class="{ active: loginType === 0 }"
              @click="loginType = 0"
          >
            登录
          </div>
          <div
              class="tab-item"
              :class="{ active: loginType === 1 }"
              @click="loginType = 1"
          >
            注册
          </div>
        </div>

        <!-- 登录表单 -->
        <div class="login-form" v-if="loginType === 0">
          <a-form layout="vertical">
            <!-- 用户名输入框 -->
            <a-form-item label="用户名">
              <a-input
                  v-model:value="loginForm.account"
                  placeholder="请输入用户名"
                  size="large"
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>

            <!-- 密码输入框 -->
            <a-form-item label="密码">
              <a-input-password
                  v-model:value="loginForm.password"
                  placeholder="请输入密码"
                  size="large"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>

            <!-- 记住密码选项 -->
            <a-form-item>
              <a-checkbox v-model:checked="loginForm.remember">
                记住密码
              </a-checkbox>
            </a-form-item>

            <!-- 登录按钮 -->
            <a-form-item>
              <a-button
                  type="primary"
                  size="large"
                  block
                  @click="handleLogin"
                  :loading="loading"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>

        <!-- 注册表单 -->
        <div class="register-form" v-else>
          <a-form layout="vertical">
            <!-- 用户名输入框 -->
            <a-form-item label="用户名">
              <a-input
                  v-model:value="registerForm.username"
                  placeholder="请输入用户名"
                  size="large"
              />
            </a-form-item>

            <!-- 密码输入框 -->
            <a-form-item label="密码">
              <a-input-password
                  v-model:value="registerForm.password"
                  placeholder="请输入密码"
                  size="large"
              />
            </a-form-item>

            <!-- 确认密码输入框 -->
            <a-form-item label="确认密码">
              <a-input-password
                  v-model:value="registerForm.password2"
                  placeholder="请再次输入密码"
                  size="large"
              />
            </a-form-item>

            <!-- 年龄输入框 -->
            <a-form-item label="年龄">
              <a-input
                  v-model:value="registerForm.age"
                  placeholder="请输入年龄"
                  size="large"
              />
            </a-form-item>

            <!-- 手机号输入组 -->
            <a-form-item label="手机号">
              <div class="phone-input-group">
                <a-input
                    v-model:value="registerForm.mobile"
                    placeholder="请输入手机号"
                    size="large"
                    @change="checkPhone"
                />
                <!-- 获取验证码按钮 -->
                <a-button
                    size="large"
                    :disabled="!isPhoneValid || smsCountdown > 0"
                    @click="getSmsCode"
                >
                  {{ smsCountdown > 0 ? `${smsCountdown}秒后重试` : '获取验证码' }}
                </a-button>
              </div>
            </a-form-item>

            <!-- 验证码输入框 -->
            <a-form-item label="验证码">
              <a-input
                  v-model:value="registerForm.smsCode"
                  placeholder="请输入验证码"
                  size="large"
              />
            </a-form-item>

            <!-- 邮箱输入框 -->
            <a-form-item label="邮箱">
              <a-input
                  v-model:value="registerForm.email"
                  placeholder="请输入邮箱"
                  size="large"
              />
            </a-form-item>

            <!-- 注册按钮 -->
            <a-form-item>
              <a-button
                  type="primary"
                  size="large"
                  block
                  @click="handleRegister"
                  :loading="loading"
              >
                注册
              </a-button>
            </a-form-item>
          </a-form>
        </div>

        <!-- 在登录表单底部添加Casdoor登录按钮 -->
        <div class="third-party-login" v-if="loginType === 0">
          <a-divider>或使用第三方登录</a-divider>
          <a-button
              class="casdoor-login-btn"
              @click="handleCasdoorLogin"
          >
            <img
                src="@/assets/images/casdoor.png"
                alt="Casdoor"
                class="casdoor-icon"
            >
            使用Casdoor登录
          </a-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {LockOutlined, UserOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'
import {useRouter} from 'vue-router'
import Sdk from "casdoor-js-sdk";



// 初始化路由实例
const router = useRouter()

/**
 * 登录/注册切换状态
 * 0: 登录状态
 * 1: 注册状态
 */
const loginType = ref(0)

/**
 * 登录表单数据
 * @property {string} account - 用户名
 * @property {string} password - 密码
 * @property {boolean} remember - 是否记住密码
 */
const loginForm = reactive({
  account: '18126192471',
  password: '123456',
  remember: false
})

/**
 * 注册表单数据
 * @property {string} username - 用户名
 * @property {string} password - 密码
 * @property {string} password2 - 确认密码
 * @property {string} age - 年龄
 * @property {string} mobile - 手机号
 * @property {string} smsCode - 验证码
 * @property {string} email - 邮箱
 */
const registerForm = reactive({
  username: '',
  password: '',
  password2: '',
  age: '',
  mobile: '',
  smsCode: '',
  email: ''
})

// 手机号验证状态
const isPhoneValid = ref(false)
// 验证码倒计时
const smsCountdown = ref(0)
// 加载状态
const loading = ref(false)

/**
 * 验证手机号格式
 */
const checkPhone = () => {
  // 手机号正则表达式
  const reg = /^1[3-9]\d{9}$/
  isPhoneValid.value = reg.test(registerForm.mobile)
}

/**
 * 获取短信验证码
 */
const getSmsCode = () => {
  // 验证手机号是否有效
  if (!isPhoneValid.value) {
    message.warning('请输入正确的手机号')
    return
  }

  // 设置倒计时60秒
  smsCountdown.value = 60
  const timer = setInterval(() => {
    smsCountdown.value--
    if (smsCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)

  message.success('验证码已发送')
}

/**
 * 处理登录操作
 */
const handleLogin = async () => {
  // 验证表单输入
  if (!loginForm.account || !loginForm.password) {
    message.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    // 模拟登录请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 根据记住密码选项选择存储方式
    const storage = loginForm.remember ? localStorage : sessionStorage
    storage.setItem('token', 'simulated_token')
    storage.setItem('account', loginForm.account)

    message.success('登录成功')
    await router.push('/dashboard')
  } catch (error) {
    message.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}

/**
 * 处理注册操作
 */
const handleRegister = async () => {
  // 验证两次密码是否一致
  if (registerForm.password !== registerForm.password2) {
    message.warning('两次输入的密码不一致')
    return
  }

  // 验证验证码是否输入
  if (!registerForm.smsCode) {
    message.warning('请输入验证码')
    return
  }

  loading.value = true
  try {
    // 模拟注册请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    message.success('注册成功')
    loginType.value = 0 // 切换到登录页

    // 清空注册表单
    Object.assign(registerForm, {
      username: '',
      password: '',
      password2: '',
      age: '',
      mobile: '',
      smsCode: '',
      email: ''
    })
  } catch (error) {
    message.error('注册失败')
  } finally {
    loading.value = false
  }
}


// Casdoor配置
const casdoorConfig = {
  serverUrl: 'http://192.168.202.206:8000',       // Casdoor服务器URL
  clientId: '3412bf235c15ddc1a082',               // Casdoor应用程序的客户端ID
  appName: 'golang-gin-demo',                        // Casdoor应用程序的名称
  organizationName: 'built-in',                   // Casdoor应用程序关联的Casdoor组织的名称
  redirectPath: '/callback',                         // 回调路由
};

// 初始化Casdoor SDK
const CasdoorSDK = new Sdk(casdoorConfig);


/**
 * 处理Casdoor登录
 */
const handleCasdoorLogin = async () => {
  // 保存当前路径，登录成功后跳转回来
  sessionStorage.setItem('redirectUrl', window.location.pathname);

  // 跳转到Casdoor登录页面
  window.location.href = CasdoorSDK.getSigninUrl()
};

/**
 * 处理Casdoor回调
 */
const handleCasdoorCallback = async () => {
  try {
    // 从URL中获取code和state
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code || !state) {
      throw new Error('无效的回调参数');
    }

    // 获取access token
    const tokenResponse = await fetch(`${casdoorConfig.serverUrl}/api/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: casdoorConfig.clientId,
        client_secret: 'your-client-secret', // 替换为你的Client Secret
        code: code,
        redirect_uri: `${window.location.origin}${casdoorConfig.redirectPath}`
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('获取token失败');
    }

    // 存储token
    localStorage.setItem('casdoor_token', JSON.stringify(tokenData));

    // 获取用户信息
    const userResponse = await fetch(`${casdoorConfig.serverUrl}/api/userinfo`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    const userInfo = await userResponse.json();

    // 存储用户信息
    localStorage.setItem('user', JSON.stringify(userInfo));

    // 跳转到dashboard
    const redirectUrl = sessionStorage.getItem('redirectUrl') || '/dashboard';
    router.push(redirectUrl);

    message.success('Casdoor登录成功');
  } catch (error) {
    console.error('Casdoor登录失败:', error);
    message.error('Casdoor登录失败');
    await router.push('/login');
  }
};

// 组件挂载时检查是否是回调页面
onMounted(() => {
  if (window.location.pathname === casdoorConfig.redirectPath) {
    handleCasdoorCallback();
  }
});
</script>

<style lang="scss" scoped>
/* 登录容器 - 全屏布局 */
.login-container {
  position: relative; /* 相对定位 */
  width: 100vw; /* 视口宽度 */
  height: 100vh; /* 视口高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

/* 登录背景图样式 */
.login-bg {
  position: absolute; /* 绝对定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login-bg.jpg') no-repeat center center; /* 背景图 */
  background-size: cover; /* 背景图覆盖 */
  filter: brightness(1.0); /* 亮度滤镜 */
  z-index: 0; /* 底层 */
}

/* 登录表单外层容器 */
.login-wrapper {
  position: relative; /* 相对定位 */
  z-index: 1; /* 显示在背景上层 */
  display: flex;
  justify-content: flex-end; /* 内容靠右 */
  align-items: center; /* 垂直居中 */
  height: 100%;
  padding-right: 10%; /* 右侧间距 */
}

/* 登录卡片样式 */
.login-card {
  width: 100%; /* 宽度100% */
  max-width: 480px; /* 最大宽度限制 */
  background: rgba(255, 255, 255, 0.4); /* 白色背景，40%透明度 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 40px; /* 内边距 */
  animation: fadeInUp 0.5s ease-out; /* 入场动画 */
  backdrop-filter: blur(5px); /* 背景模糊效果 */
  border: 1px solid rgba(255, 255, 255, 0.8); /* 半透明边框 */
}

/* 登录标题样式 */
.login-header {
  text-align: center; /* 居中 */
  margin-bottom: 30px; /* 底部间距 */

  h2 {
    font-size: 24px; /* 字体大小 */
    color: #333; /* 字体颜色 */
    margin: 0; /* 去除默认边距 */
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); /* 文字阴影 */
  }
}

/* 登录/注册选项卡样式 */
.login-tabs {
  display: flex; /* 弹性布局 */
  margin-bottom: 30px; /* 底部间距 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* 底部边框 */

  .tab-item {
    flex: 1; /* 等分宽度 */
    text-align: center; /* 居中 */
    padding: 12px 0; /* 内边距 */
    cursor: pointer; /* 手型指针 */
    font-size: 16px; /* 字体大小 */
    color: #666; /* 字体颜色 */
    transition: all 0.3s; /* 过渡效果 */

    &:hover {
      color: #1890ff; /* 悬停颜色 */
    }

    /* 激活状态 */
    &.active {
      color: #1890ff; /* 激活颜色 */
      border-bottom: 2px solid #1890ff; /* 底部边框 */
      font-weight: 500; /* 字体粗细 */
    }
  }
}

/* 手机号输入组样式 */
.phone-input-group {
  display: flex; /* 弹性布局 */
  gap: 10px; /* 元素间距 */

  .ant-input {
    flex: 1; /* 输入框占据剩余空间 */
  }
}

/* 第三方登录样式 */
.third-party-login {
  margin-top: 24px;
  text-align: center;
}

.casdoor-login-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.casdoor-login-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.casdoor-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

/* 淡入上移动画 */
@keyframes fadeInUp {
  from {
    opacity: 0; /* 初始透明度 */
    transform: translateY(20px); /* 初始位置 */
  }
  to {
    opacity: 1; /* 结束透明度 */
    transform: translateY(0); /* 结束位置 */
  }
}

/* 响应式调整 - 移动端 */
@media (max-width: 768px) {
  .login-wrapper {
    padding-right: 5%; /* 减小右侧间距 */
    justify-content: center; /* 居中显示 */
  }

  .login-card {
    padding: 24px; /* 减小内边距 */
    width: 95%; /* 宽度调整 */
    max-width: none; /* 取消最大宽度限制 */
    background: rgba(255, 255, 255, 0.8); /* 增加移动端透明度 */
  }

  .login-header h2 {
    font-size: 20px; /* 减小字体大小 */
  }
}
</style>