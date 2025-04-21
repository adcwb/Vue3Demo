<template>
  <footer class="common-footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>关于我们</h3>
        <p>企业简介文字内容，介绍公司的主要业务和愿景...</p>
      </div>

      <div class="footer-section">
        <h3>联系方式</h3>
        <p><EnvironmentOutlined /> 地址：北京市海淀区xx路xx号</p>
        <p><PhoneOutlined /> 电话：010-12345678</p>
        <p><MailOutlined /> 邮箱：contact@company.com</p>
      </div>

      <div class="footer-section">
        <h3>快速链接</h3>
        <a href="#">首页</a>
        <a href="#">产品中心</a>
        <a href="#">解决方案</a>
        <a href="#">客户案例</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 企业名称 版权所有 | 京ICP备12345678号-1</p>
      <div class="social-links">
        <a href="#"><WechatOutlined /></a>
        <a href="#"><WeiboOutlined /></a>
        <a href="#"><LinkedinOutlined /></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 导入需要的图标组件
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  WechatOutlined,
  WeiboOutlined,
  LinkedinOutlined
} from '@ant-design/icons-vue'
</script>

<style lang="scss" scoped>
/* 原有样式保持不变 */
.common-footer {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 40px 20px 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.footer-section {
  h3 {
    color: #fff;
    margin-bottom: 15px;
    font-size: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 10px;
  }

  p, a {
    color: rgba(255, 255, 255, 0.7);
    margin: 8px 0;
    display: block;

    &:hover {
      color: #1890ff;
    }
  }

  .anticon {
    margin-right: 8px;
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 30px auto 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
  }
}

.social-links {
  a {
    color: rgba(255, 255, 255, 0.7);
    margin-left: 15px;
    font-size: 18px;

    &:hover {
      color: #1890ff;
    }
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;

    .social-links {
      margin-top: 15px;

      a {
        margin: 0 8px;
      }
    }
  }
}
</style>