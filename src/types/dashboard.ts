// src/types/dashboard.ts

/**
 * 服务器指标数据接口
 */
export interface ServerMetrics {
    name: string;          // 指标名称
    value: number;         // 指标数值
    unit: string;          // 单位
    status: string;        // 状态
  }
  
  /**
   * API响应数据结构
   */
  export interface ServerMetricsResponse {
    data: ServerMetrics[]; // 服务器指标数据数组
  }