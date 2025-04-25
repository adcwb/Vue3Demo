// src/api/dashboard.ts
import { ServerMetricsResponse } from '@/types/dashboard';
import http from '@/utils/http';

/**
 * 获取服务器指标数据
 * @returns 包含服务器指标数据的Promise
 */
export const getServerMetrics = () => {
  return http.get<ServerMetricsResponse>('/dashboard/GetInfo');
};