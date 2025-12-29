# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Documentation**:
  - Comprehensive README with project details, setup instructions, and development workflow
  - CONTRIBUTING.md with contribution guidelines and coding standards
  - CODE_OF_CONDUCT.md for community guidelines
  - MIT LICENSE file
  - ARCHITECTURE.md with detailed system architecture documentation
  - CHANGELOG.md for tracking project changes

- **Backend**:
  - Health check endpoint at `/api/health` returning status, version, and timestamp
  - CORS middleware with configurable origin (via `CORS_ALLOWED_ORIGIN` env var)
  - Structured logging with tracing crate and environment-based log levels
  - Enhanced API documentation with OpenAPI 3.1
  - Code formatting configuration (rustfmt.toml)
  - Linting configuration (.clippy.toml)
  - Environment variable documentation (.env.example)
  - Proper error handling and request logging

- **Frontend**:
  - ErrorBoundary component for graceful error handling
  - Environment variable documentation (.env.example)
  - Code formatting configuration (.prettierrc)
  - Type-safe User interface in API service
  - Health check integration in status checking

### Changed
- **Backend**:
  - Enhanced code organization with comprehensive documentation
  - Improved error handling and logging throughout
  - Updated API title to "PolarisShu Backend API"
  - Made CORS origin configurable via environment variable

- **Frontend**:
  - Updated API service to use dedicated health check endpoint
  - Improved type safety by defining User interface locally
  - Enhanced error handling with ErrorBoundary wrapper

### Fixed
- TypeScript build errors in frontend components
- Proper type imports in ErrorBoundary component
- CORS configuration now supports multiple environments

### Security
- CORS properly configured with environment-based origins
- TypeScript strict mode enabled for maximum type safety
- No vulnerabilities found in npm audit

## [0.1.0] - 2025-12-29

### Added
- Initial project setup with Rust backend (Salvo framework)
- React frontend with TypeScript and Tailwind CSS
- User list API endpoint
- OpenAPI documentation with Swagger UI
- Development and build scripts
- Basic project structure and configuration

[Unreleased]: https://github.com/nkanf-dev/PolarisShu/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/nkanf-dev/PolarisShu/releases/tag/v0.1.0
