<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { getDashboardData } from '@/api/dashboard'
import type { DashboardData } from '@/types/dashboard'

const userStore = useUserStore()
const loading = ref(false)
const dashboardData = ref<DashboardData>()

const fetchData = async () => {
  try {
    loading.value = true
    dashboardData.value = await getDashboardData()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="dashboard-container">
    <a-page-header
        title="仪表盘"
        :subtitle="`欢迎回来，${userStore.userInfo?.nickname || '用户'}`"
    />

    <a-row :gutter="16" class="mt-4">
      <a-col :span="6">
        <a-card title="访问量" :loading="loading">
          <template #extra>
            <a-tag color="blue">日</a-tag>
          </template>
          <div class="text-4xl font-bold">
            {{ dashboardData?.visits || 0 }}
          </div>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="销售额" :loading="loading">
          <template #extra>
            <a-tag color="green">月</a-tag>
          </template>
          <div class="text-4xl font-bold">
            ¥{{ dashboardData?.sales || 0 }}
          </div>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="订单数" :loading="loading">
          <template #extra>
            <a-tag color="orange">周</a-tag>
          </template>
          <div class="text-4xl font-bold">
            {{ dashboardData?.orders || 0 }}
          </div>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="用户数" :loading="loading">
          <template #extra>
            <a-tag color="purple">总</a-tag>
          </template>
          <div class="text-4xl font-bold">
            {{ dashboardData?.users || 0 }}
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="最近活动" class="mt-4" :loading="loading">
      <a-timeline>
        <a-timeline-item
            v-for="(activity, index) in dashboardData?.activities"
            :key="index"
        >
          {{ activity.content }}
          <template #dot>
            <a-avatar :src="activity.avatar" />
          </template>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}
</style>