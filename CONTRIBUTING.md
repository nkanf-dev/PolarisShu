# 贡献指南 Contributing Guide

感谢您对 PolarisShu 项目的关注！我们欢迎任何形式的贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)

## 行为准则

请阅读并遵守我们的 [行为准则](CODE_OF_CONDUCT.md)，以确保社区的友好和包容。

## 如何贡献

### 报告 Bug

如果您发现了 bug，请：

1. 在 [Issues](https://github.com/nkanf-dev/PolarisShu/issues) 中搜索是否已有相关问题
2. 如果没有，创建新 issue，并包含：
   - 清晰的标题和描述
   - 重现步骤
   - 预期行为和实际行为
   - 环境信息（操作系统、Rust/Bun 版本等）
   - 如果可能，提供错误日志或截图

### 提出新功能

1. 先创建一个 issue 讨论您的想法
2. 说明为什么需要这个功能
3. 描述功能的预期行为
4. 等待维护者反馈后再开始实现

### 改进文档

文档改进无需创建 issue，直接提交 PR 即可。包括但不限于：
- 修正错别字
- 改进表述
- 添加示例
- 翻译文档

## 开发流程

### 1. Fork 和 Clone

```bash
# Fork 项目到您的 GitHub 账号
# 然后 clone 到本地
git clone https://github.com/YOUR-USERNAME/PolarisShu.git
cd PolarisShu

# 添加上游仓库
git remote add upstream https://github.com/nkanf-dev/PolarisShu.git
```

### 2. 创建分支

```bash
# 更新主分支
git checkout main
git pull upstream main

# 创建功能分支
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 3. 安装依赖

```bash
# 安装前端依赖
bun install
cd frontend && bun install && cd ..

# 后端依赖会在首次构建时自动安装
```

### 4. 开始开发

```bash
# 启动开发环境
bun run dev
```

### 5. 测试您的更改

```bash
# 前端测试
cd frontend && bun run lint

# 后端测试
cd backend
cargo test
cargo clippy
cargo fmt --check
```

### 6. 提交更改

```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/your-feature-name
```

### 7. 创建 Pull Request

1. 在 GitHub 上打开您的 fork
2. 点击 "New Pull Request"
3. 选择您的分支
4. 填写 PR 描述（参考模板）
5. 等待审查

## 代码规范

### Rust 代码规范

遵循 Rust 官方风格指南：

```bash
# 格式化代码
cargo fmt

# 运行 Clippy 检查
cargo clippy -- -D warnings

# 运行测试
cargo test
```

**规范要点**：
- 使用 4 空格缩进
- 遵循 Rust API 指南的命名约定
- 为公共 API 编写文档注释
- 添加单元测试覆盖新功能
- 使用 `Result` 类型处理错误
- 避免 `unwrap()`，使用 `?` 操作符或正确的错误处理

### TypeScript/React 代码规范

使用 ESLint 进行代码检查：

```bash
cd frontend
bun run lint
```

**规范要点**：
- 使用 2 空格缩进
- 使用 TypeScript 严格模式
- 函数组件使用 `React.FC` 类型
- Props 接口以组件名 + `Props` 命名
- 使用 `const` 声明函数组件
- 为所有 props 添加类型定义
- 使用语义化的 HTML 标签
- 添加适当的 ARIA 属性以提高可访问性

### 样式规范

- 使用 Tailwind CSS 实用类
- 避免内联样式（除非必要）
- 保持样式类的顺序一致：布局 → 尺寸 → 外观 → 文字

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化（不影响代码运行）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建工具或辅助工具的变动
- `ci`: CI/CD 配置更改

### 示例

```bash
feat(backend): add book search API endpoint

Implement a new API endpoint for searching books by title, author, or ISBN.
Includes pagination support and proper error handling.

Closes #123
```

```bash
fix(frontend): resolve user list loading state issue

Fix the issue where user list would show empty state
while still loading data from the API.
```

## Pull Request 流程

### PR 标题

使用与提交相同的规范：

```
feat(backend): add user authentication
fix(frontend): resolve styling issue in user card
docs: update installation guide
```

### PR 描述模板

```markdown
## 描述
简要描述本次更改的内容和目的。

## 类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 重构
- [ ] 文档更新
- [ ] 性能优化

## 变更内容
- 更改点 1
- 更改点 2
- 更改点 3

## 测试
说明如何测试这些更改。

## 截图（如果适用）
添加截图以帮助说明您的更改。

## 检查清单
- [ ] 代码遵循项目的代码规范
- [ ] 已运行测试且全部通过
- [ ] 已添加必要的文档
- [ ] 更改不引入新的警告
- [ ] 已添加/更新测试覆盖新功能
```

### 审查流程

1. **自动检查**：CI/CD 会自动运行测试和检查
2. **代码审查**：至少需要一位维护者批准
3. **讨论和修改**：根据反馈进行必要的修改
4. **合并**：通过审查后，维护者会合并您的 PR

### 审查标准

- 代码质量和可读性
- 是否遵循项目规范
- 测试覆盖率
- 文档完整性
- 性能影响
- 向后兼容性

## 开发提示

### 调试技巧

**后端调试**：
```bash
# 使用 RUST_LOG 环境变量控制日志级别
RUST_LOG=debug cargo run

# 使用 cargo-watch 自动重新编译
cargo watch -x run
```

**前端调试**：
```bash
# 使用 React DevTools
# 在浏览器中安装 React Developer Tools 扩展

# 查看网络请求
# 打开浏览器开发者工具的 Network 标签
```

### 常见问题

**Q: 如何生成 TypeScript 类型？**
```bash
# 确保后端正在运行
cd frontend
bun run generate:types
```

**Q: 如何清理构建产物？**
```bash
# 前端
cd frontend && rm -rf dist node_modules

# 后端
cd backend && cargo clean
```

**Q: 如何更新依赖？**
```bash
# 前端
cd frontend && bun update

# 后端
cd backend && cargo update
```

## 获取帮助

如果您有任何问题：

1. 查看 [README.md](README.md) 和项目文档
2. 搜索现有的 [Issues](https://github.com/nkanf-dev/PolarisShu/issues)
3. 在 [Discussions](https://github.com/nkanf-dev/PolarisShu/discussions) 提问
4. 创建新的 issue

## 感谢您的贡献！

每一个贡献都让 PolarisShu 变得更好。无论是代码、文档、设计还是反馈，我们都非常感激！

---

**Happy Coding! 📚✨**
