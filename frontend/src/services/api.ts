import axios, { type AxiosResponse } from 'axios';
import type { components, operations } from '../types/api';

export type User = components['schemas']['backend.User'];

export type UserListResponse = operations['backend.get_users']['responses'][200]['content']['application/json'];

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiService {
  /**
   * 获取用户列表
   * @returns Promise<User[]> 用户列表
   */
  static async getUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<UserListResponse> = await apiClient.get('/api/users');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('获取用户列表失败');
    }
  }

  /**
   * 检查API连接状态
   * @returns Promise<boolean> 连接是否正常
   */
  static async checkHealth(): Promise<boolean> {
    try {
      await apiClient.get('/api/users');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default ApiService;
