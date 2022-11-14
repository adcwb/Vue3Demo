<template>
  <a-layout style="min-height: 100vh">
    <!--  左侧菜单管理  -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" style="font-size: 25px; color: white"> 微信公众平台 </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu :key="index" v-for="(item, index) in data_list">
          <template #title>
            <span>
              <component :is="proxy.$antIcons[item.icon]" />
              <span>{{item.name}}</span>
            </span>
          </template>
          <a-menu-item :key="item2.id" :temp="index2" v-for="(item2, index2) in item.data" >
            <component :is="proxy.$antIcons[item2.icon]" />
            <span>{{item2.name}}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!--  右侧顶部页眉信息    -->
      <a-layout-header style="background: #fff; padding: 0" />

      <a-layout-conte9-nt style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '720px' }">
          Bill is a cat.
        </div>
      </a-layout-conte9-nt>
      <!--  底部页脚信息   -->
      <a-layout-footer class="footer">
        微信公众平台 © 2013-2021 深圳市天朝通讯科技限公司版权所有
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
// @ is an alias to /src
import { defineComponent, ref, reactive, getCurrentInstance  } from 'vue';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const data_list = reactive(
        [
          {
            "name": "菜单管理",
            "icon": "HomeFilled",
            "data": [
              {"id": "11", "name": "自定义菜单", "icon": "HomeFilled", "url": ""},
              {"id": "12", "name": "历史记录", "icon": "HomeFilled", "url": ""},
            ]
          },
          {
            "name": "会话管理",
            "icon": "MessageFilled",
            "data": [
              {"id": "21", "name": "会话列表", "icon": "MessageFilled", "url": ""},
              {"id": "22", "name": "客服管理", "icon": "MessageFilled", "url": ""},
              {"id": "22", "name": "聊天记录", "icon": "MessageFilled", "url": ""},
            ]
          },
          {
            "name": "素材管理",
            "icon": "AppstoreFilled",
            "data": [
              {"id": "31", "name": "素材列表", "icon": "AppstoreFilled", "url": ""},
              {"id": "32", "name": "临时素材", "icon": "AppstoreFilled", "url": ""},
              {"id": "33", "name": "历史素材", "icon": "AppstoreFilled", "url": ""},
            ]
          },
          {
            "name": "发布管理",
            "icon": "SoundFilled",
            "data": [
              {"id": "41", "name": "发布列表", "icon": "SoundFilled", "url": ""},
              {"id": "42", "name": "草稿箱", "icon": "SoundFilled", "url": ""},
              {"id": "43", "name": "历史发布", "icon": "SoundFilled", "url": ""},
            ]
          },
          {
            "name": "数据统计",
            "icon": "PieChartFilled",
            "data": [
              {"id": "51", "name": "用户数据", "icon": "PieChartFilled", "url": ""},
              {"id": "52", "name": "图文群发", "icon": "PieChartFilled", "url": ""},
              {"id": "53", "name": "图文分享", "icon": "PieChartFilled", "url": ""},
            ]
          },
          {
            "name": "系统管理",
            "icon": "SettingFilled",
            "data": [
              {"id": "51", "name": "账号管理", "icon": "SettingFilled", "url": ""},
              {"id": "52", "name": "配置管理", "icon": "SettingFilled", "url": ""},
              {"id": "53", "name": "权限管理", "icon": "SettingFilled", "url": ""},
            ]
          },
        ]
    )
    return {
      data_list,
      proxy
    }
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },
});
</script>

<style scoped lang="scss">
#components-layout-demo-side div.logo {
  height: 100px;
  width: 200px;
  margin: 16px;
  font-size: 25px;
  background: rgba(255, 255, 255, 0.3);
}

#element.style {
  height: 100px;
  width: 200px;
}
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  text-align: center
}

</style>
