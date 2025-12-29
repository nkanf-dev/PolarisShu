import axios, { type AxiosResponse } from 'axios';

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserListResponse = User[];

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
      await apiClient.get('/api/health');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default ApiService;
