<template>
  <div class="dashboard-container">
    <h1>数据仪表盘</h1>
    
    <div class="stats-cards">
      <div class="stat-card">
        <h3>总用户数</h3>
        <p class="value">{{ stats.totalUsers }}</p>
        <p class="change positive">↑ 12%</p>
      </div>
      <div class="stat-card">
        <h3>订单数量</h3>
        <p class="value">{{ stats.totalOrders }}</p>
        <p class="change negative">↓ 5%</p>
      </div>
      <div class="stat-card">
        <h3>总收入</h3>
        <p class="value">¥{{ stats.totalRevenue }}</p>
        <p class="change positive">↑ 8%</p>
      </div>
      <div class="stat-card">
        <h3>活跃用户</h3>
        <p class="value">{{ stats.activeUsers }}</p>
        <p class="change positive">↑ 3%</p>
      </div>
    </div>
    
    <div class="charts-row">
      <div class="chart-container">
        <h2>用户增长趋势</h2>
        <VChart class="chart" :option="userGrowthOption" autoresize />
      </div>
      <div class="chart-container">
        <h2>销售分布</h2>
        <VChart class="chart" :option="salesDistributionOption" autoresize />
      </div>
    </div>
    
    <div class="full-width-chart">
      <h2>月度销售数据</h2>
      <VChart class="chart" :option="monthlySalesOption" autoresize />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

// 注册必要的ECharts组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

// 统计数据
interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  activeUsers: number
}

const stats = ref<DashboardStats>({
  totalUsers: 12453,
  totalOrders: 3421,
  totalRevenue: 1254300,
  activeUsers: 8432
})

// 用户增长图表配置
const userGrowthOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['新用户', '活跃用户']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '新用户',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true,
      lineStyle: {
        width: 3
      }
    },
    {
      name: '活跃用户',
      type: 'bar',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
})

// 销售分布图表配置
const salesDistributionOption = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '销售分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '电子产品' },
        { value: 735, name: '服装' },
        { value: 580, name: '食品' },
        { value: 484, name: '家居' },
        { value: 300, name: '其他' }
      ]
    }
  ]
})

// 月度销售数据图表配置
const monthlySalesOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    data: ['销售额', '订单量', '平均订单价']
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '销售额',
      min: 0,
      max: 200,
      interval: 50,
      axisLabel: {
        formatter: '¥{value}'
      }
    },
    {
      type: 'value',
      name: '订单量',
      min: 0,
      max: 50,
      interval: 10
    }
  ],
  series: [
    {
      name: '销售额',
      type: 'bar',
      barWidth: '30%',
      data: [45, 78, 96, 112, 156, 178, 192]
    },
    {
      name: '订单量',
      type: 'line',
      yAxisIndex: 1,
      data: [12, 18, 22, 25, 30, 35, 42]
    },
    {
      name: '平均订单价',
      type: 'line',
      data: [3.75, 4.33, 4.36, 4.48, 5.2, 5.09, 4.57],
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }
  ]
})

onMounted(() => {
  // 这里可以添加数据获取逻辑
  console.log('Dashboard mounted')
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin-top: 0;
  color: #666;
  font-size: 16px;
}

.stat-card .value {
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0;
}

.stat-card .change {
  margin: 0;
  font-size: 14px;
}

.stat-card .change.positive {
  color: #52c41a;
}

.stat-card .change.negative {
  color: #f5222d;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container, .full-width-chart {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.full-width-chart {
  grid-column: span 2;
}

.chart-container h2, .full-width-chart h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
}

.chart {
  height: 400px;
  width: 100%;
}

@media (max-width: 1200px) {
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-row {
    grid-template-columns: 1fr;
  }
  
  .full-width-chart {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>