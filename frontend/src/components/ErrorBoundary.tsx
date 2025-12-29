import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                应用程序出错
              </h1>
              <p className="text-gray-600">
                抱歉，应用程序遇到了一个意外错误
              </p>
            </div>

            {this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <h2 className="text-lg font-semibold text-red-800 mb-2">
                  错误详情
                </h2>
                <p className="text-red-700 font-mono text-sm mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-red-600 hover:text-red-800 font-medium">
                      查看堆栈跟踪
                    </summary>
                    <pre className="mt-2 text-xs overflow-x-auto text-red-600 bg-red-100 p-2 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                重试
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
              >
                返回首页
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>如果问题持续存在，请联系技术支持</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
