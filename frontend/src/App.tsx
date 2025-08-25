import { useState, useEffect } from 'react';
import UserList from './components/UserList';
import { ApiService } from './services/api';

function App() {
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const isHealthy = await ApiService.checkHealth();
        setIsBackendConnected(isHealthy);
      } catch (error) {
        setIsBackendConnected(false);
        console.error('Backend health check failed:', error);
      }
    };

    checkBackendHealth();
  }, []);

  const StatusBadge = () => {
    if (isBackendConnected === null) {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
          检查连接中...
        </div>
      );
    }
    
    if (isBackendConnected) {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          后端已连接
        </div>
      );
    }
    
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        后端未连接
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">北辰书塾</h1>
              <span className="ml-3 text-sm text-gray-500">PolarisShu</span>
            </div>
            <StatusBadge />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">🔗 API 信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-gray-900">
                <span className="font-medium text-gray-700">后端服务:</span>
                <span className="text-gray-900 font-mono text-sm">localhost:8080</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-gray-900">
                <span className="font-medium text-gray-700">Swagger UI:</span>
                <a 
                  href="http://localhost:8080/swagger-ui" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 font-medium underline"
                >
                  查看文档
                </a>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-gray-900">
                <span className="font-medium text-gray-700">OpenAPI:</span>
                <a 
                  href="http://localhost:8080/api-docs/openapi.json" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 font-medium underline"
                >
                  JSON 文档
                </a>
              </div>
            </div>
          </div>

          {isBackendConnected ? (
            <UserList />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">无法连接到后端服务</h3>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                重新连接
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-600">
              🦀 Powered by <strong>Rust (Salvo)</strong> + ⚛️ <strong>React with Tailwind CSS</strong>
            </p>
            <div className="mt-2 flex justify-center space-x-6 text-sm text-gray-500">
              <span>❤❤❤</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
