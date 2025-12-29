# ![PolarisShuLogo](frontend/public/logo.svg) 北辰书塾 PolarisShu

![PolarisShuBanner](PolarisShuBanner.webp)

一个优雅的个人图书馆管理系统，让您的藏书井然有序，阅读体验更加美好。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=flat&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ 特性

- 🦀 **高性能后端**: 使用 Rust + Salvo 框架构建，提供极致性能和内存安全
- ⚛️ **现代化前端**: React 19 + TypeScript + Tailwind CSS，提供流畅的用户体验
- 📚 **图书管理**: 轻松管理您的个人藏书库
- 🔍 **OpenAPI 文档**: 内置 Swagger UI，完整的 API 文档
- 🎨 **优雅 UI**: 精心设计的界面，注重细节和用户体验
- 🚀 **快速开发**: 使用 Bun 作为包管理器和运行时，开发体验丝滑

## 🏗️ 项目架构

```
PolarisShu/
├── backend/           # Rust 后端服务
│   ├── src/
│   │   └── main.rs   # 主应用入口
│   └── Cargo.toml    # Rust 依赖配置
├── frontend/          # React 前端应用
│   ├── src/
│   │   ├── components/  # React 组件
│   │   ├── services/    # API 服务层
│   │   ├── App.tsx      # 主应用组件
│   │   └── main.tsx     # 应用入口
│   └── package.json
├── scripts/           # 构建和开发脚本
│   ├── dev.ts        # 开发环境启动脚本
│   └── build.ts      # 生产构建脚本
└── package.json       # 根项目配置
```

## 🚀 快速开始

### 环境要求

请确保您的开发环境已安装以下工具：

- **[Bun](https://bun.sh)** (>= 1.0) - JavaScript 运行时和包管理器
- **[Rust](https://rustup.rs)** (>= 1.70) - Rust 编程语言
- **[cargo-watch](https://github.com/watchexec/cargo-watch)** - Rust 热重载工具

```bash
# 安装 Bun (macOS/Linux)
curl -fsSL https://bun.sh/install | bash

# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 安装 cargo-watch
cargo install cargo-watch
```

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/nkanf-dev/PolarisShu.git
cd PolarisShu

# 安装前端依赖
bun install
cd frontend && bun install && cd ..
```

### 启动开发环境

```bash
# 方式 1: 同时启动前后端 (推荐)
bun run dev

# 方式 2: 分别启动
bun run dev:frontend  # 前端 (http://localhost:5173)
bun run dev:backend   # 后端 (http://localhost:8080)
```

### 访问应用

- **前端应用**: http://localhost:5173
- **后端 API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui
- **OpenAPI 文档**: http://localhost:8080/api-docs/openapi.json

## 🔨 开发工作流

### 生成 TypeScript 类型

前端使用 OpenAPI 自动生成 TypeScript 类型定义：

```bash
# 确保后端正在运行
bun run dev:backend

# 在新终端生成类型
cd frontend
bun run generate:types
```

### 代码检查

```bash
# 前端 ESLint 检查
cd frontend && bun run lint

# 后端 Clippy 检查
cd backend && cargo clippy

# 后端代码格式化
cd backend && cargo fmt
```

### 构建生产版本

```bash
# 构建前后端
bun run build

# 分别构建
bun run build:frontend  # 输出到 frontend/dist
bun run build:backend   # 输出到 backend/target/release
```

## 📚 API 文档

本项目使用 OpenAPI 3.0 规范，提供完整的 API 文档。

### 查看 API 文档

1. 启动后端服务: `bun run dev:backend`
2. 访问 Swagger UI: http://localhost:8080/swagger-ui
3. 或直接查看 OpenAPI JSON: http://localhost:8080/api-docs/openapi.json

### 主要 API 端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/users` | GET | 获取用户列表 |

## 🧪 测试

```bash
# 前端测试 (待实现)
cd frontend && bun test

# 后端测试
cd backend && cargo test
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细信息。

### 提交规范

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具链更新

## 📝 技术栈

### 后端
- **框架**: [Salvo](https://salvo.rs) - 高性能 Rust Web 框架
- **异步运行时**: [Tokio](https://tokio.rs)
- **序列化**: [Serde](https://serde.rs)
- **日志**: [tracing](https://tracing.rs)

### 前端
- **框架**: [React 19](https://react.dev)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com)
- **构建工具**: [Vite](https://vitejs.dev)
- **HTTP 客户端**: [Axios](https://axios-http.com)
- **类型生成**: [openapi-typescript](https://openapi-ts.dev)

## 🐛 故障排查

### 后端启动失败

```bash
# 检查端口占用
lsof -i :8080

# 清理并重新构建
cd backend
cargo clean
cargo build
```

### 前端类型错误

```bash
# 重新生成类型定义
cd frontend
bun run generate:types
```

### 依赖安装问题

```bash
# 清理缓存并重新安装
rm -rf node_modules bun.lock frontend/node_modules frontend/bun.lock
bun install
cd frontend && bun install
```

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

**北辰书塾** - 让阅读更有序，让知识更珍贵 📚✨

Made with ❤️ by the PolarisShu Team
