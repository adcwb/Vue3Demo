<template>
  <header class="common-header">
    <div class="header-container">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="Company Logo">
        <h1>企业名称</h1>
      </div>
      <nav class="nav-links">
        <a href="#">首页</a>
        <a href="#">产品</a>
        <a href="#">解决方案</a>
        <a href="#">联系我们</a>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.common-header {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo {
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }

  h1 {
    margin: 0;
    font-size: 20px;
    color: #1890ff;
  }
}

.nav-links {
  a {
    margin-left: 20px;
    color: #333;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: #1890ff;
    }
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    padding: 10px 0;
  }

  .nav-links {
    margin-top: 10px;

    a {
      margin: 0 10px;
    }
  }
}
</style>