# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive README with project details, setup instructions, and development workflow
- CONTRIBUTING.md with contribution guidelines and coding standards
- CODE_OF_CONDUCT.md for community guidelines
- MIT LICENSE file
- ARCHITECTURE.md with detailed system architecture documentation
- Health check endpoint at `/api/health`
- CORS middleware for cross-origin requests
- Structured logging with tracing crate
- Error boundary component for React error handling
- Environment variable documentation (.env.example)
- Code formatting configurations (rustfmt.toml, .prettierrc)
- Linting configurations (.clippy.toml, eslint.config.js)

### Changed
- Enhanced backend with proper error handling and logging
- Improved API documentation with OpenAPI 3.1
- Updated frontend API service to use health endpoint
- Improved code organization and documentation

### Fixed
- TypeScript build errors in frontend
- API type definitions in frontend

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
