import React, { useState, useEffect } from 'react';
import { ApiService, type User } from '../services/api';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface UserListProps {
  className?: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-lg mr-4 flex-shrink-0">
      {user.name.charAt(0).toUpperCase()}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold text-gray-900 truncate">{user.name}</h3>
      <p className="text-gray-600 truncate">{user.email}</p>
      <span className="text-xs text-gray-400 font-mono">ID: {user.id}</span>
    </div>
  </div>
);

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg animate-pulse">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">⚠️</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">获取数据失败</h3>
    <p className="text-red-600 mb-6">{error}</p>
    <button 
      onClick={onRetry}
      className="btn-primary"
    >
      重试
    </button>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">👤</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">暂无用户数据</h3>
    <p className="text-gray-600">目前还没有任何用户信息</p>
  </div>
);

/**
 * 用户列表组件
 * 从后端API获取并显示用户列表
 */
const UserList: React.FC<UserListProps> = ({ className = '' }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>('');

  const fetchUsers = async () => {
    setLoadingState('loading');
    setError('');

    try {
      const userData = await ApiService.getUsers();
      setUsers(userData);
      setLoadingState('success');
      console.log('✅ 成功获取用户数据:', userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      setError(errorMessage);
      setLoadingState('error');
      console.error('❌ 获取用户数据失败:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRetry = () => {
    fetchUsers();
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">👥 用户列表</h2>
        <button 
          onClick={fetchUsers}
          disabled={loadingState === 'loading'}
          className={`btn-secondary ${loadingState === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loadingState === 'loading' ? '加载中...' : '刷新'}
        </button>
      </div>

      <div className="p-6">
        {loadingState === 'loading' && <LoadingSkeleton />}
        
        {loadingState === 'error' && (
          <ErrorDisplay error={error} onRetry={handleRetry} />
        )}
        
        {loadingState === 'success' && users.length === 0 && <EmptyState />}
        
        {loadingState === 'success' && users.length > 0 && (
          <div className="space-y-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      {loadingState === 'success' && users.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
          <span>共 {users.length} 个用户</span>
          <span>{new Date().toLocaleTimeString()} 更新</span>
        </div>
      )}
    </div>
  );
};

export default UserList;
