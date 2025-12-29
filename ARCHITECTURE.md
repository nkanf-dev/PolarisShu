# PolarisShu Architecture

## Overview

PolarisShu is a full-stack monorepo application built with modern web technologies. It follows a client-server architecture with a clear separation between frontend and backend concerns.

## Tech Stack

### Backend
- **Language**: Rust (2024 Edition)
- **Web Framework**: Salvo 0.82
- **Async Runtime**: Tokio
- **Serialization**: Serde
- **Logging**: Tracing + Tracing-Subscriber
- **API Documentation**: OpenAPI 3.1 + Swagger UI

### Frontend
- **Language**: TypeScript 5.8
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Type Generation**: openapi-typescript

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  React Components                                    │   │
│  │  ├── App.tsx (Main Application)                      │   │
│  │  ├── UserList.tsx (User Display)                     │   │
│  │  └── ErrorBoundary.tsx (Error Handling)             │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                         │
│  ┌─────────────────▼───────────────────────────────────┐   │
│  │  Services Layer                                      │   │
│  │  └── api.ts (API Client with Axios)                 │   │
│  └─────────────────┬───────────────────────────────────┘   │
└────────────────────┼─────────────────────────────────────────┘
                     │ HTTP Requests
                     │ (Vite Proxy: /api → localhost:8080)
┌────────────────────▼─────────────────────────────────────────┐
│                         Backend                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Router & Middleware                                 │   │
│  │  ├── CORS Handler                                    │   │
│  │  └── Routes Configuration                            │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                         │
│  ┌─────────────────▼───────────────────────────────────┐   │
│  │  API Handlers (Endpoints)                            │   │
│  │  ├── GET /api/health (Health Check)                 │   │
│  │  ├── GET /api/users (List Users)                    │   │
│  │  ├── GET /swagger-ui (API Documentation)            │   │
│  │  └── GET /api-docs/openapi.json (OpenAPI Spec)      │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                         │
│  ┌─────────────────▼───────────────────────────────────┐   │
│  │  Models & Business Logic                             │   │
│  │  ├── User Model                                      │   │
│  │  └── HealthResponse Model                            │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## Project Structure

```
PolarisShu/
├── backend/                    # Rust backend service
│   ├── src/
│   │   └── main.rs            # Main application with all logic
│   ├── Cargo.toml             # Rust dependencies
│   ├── rustfmt.toml           # Code formatting config
│   └── .clippy.toml           # Linting config
│
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── UserList.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── services/          # API service layer
│   │   │   └── api.ts
│   │   ├── assets/            # Static assets
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Public assets
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── tsconfig.json          # TypeScript config
│   ├── eslint.config.js       # ESLint config
│   └── .prettierrc            # Prettier config
│
├── scripts/                    # Build and dev scripts
│   ├── dev.ts                 # Development environment script
│   └── build.ts               # Production build script
│
├── docs/                       # Documentation
│   └── ARCHITECTURE.md        # This file
│
├── README.md                   # Project readme
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE_OF_CONDUCT.md          # Code of conduct
├── LICENSE                     # MIT License
├── package.json                # Root project config
└── .gitignore                  # Git ignore rules
```

## Data Flow

### 1. Health Check Flow
```
User → Frontend App → GET /api/health
                         ↓
                    Backend Handler
                         ↓
                    Returns: {status, version, timestamp}
                         ↓
                    Frontend Updates UI
```

### 2. User List Flow
```
User → UserList Component → ApiService.getUsers()
                               ↓
                          GET /api/users
                               ↓
                          Backend Handler
                               ↓
                          Returns: User[]
                               ↓
                          Frontend Renders List
```

## Key Design Decisions

### Backend

1. **Monolithic Structure**: Currently, all backend code is in `main.rs`. As the project grows, consider splitting into modules:
   - `handlers/` - Endpoint handlers
   - `models/` - Data models
   - `middleware/` - Custom middleware
   - `config/` - Configuration management

2. **Error Handling**: Uses Rust's Result type for error propagation. Future: implement custom error types with thiserror.

3. **CORS Configuration**: Configured to allow localhost:5173 (Vite dev server). In production, update to allow production domain.

4. **Logging**: Uses `tracing` crate with environment-based log levels (default: info).

5. **API Documentation**: Auto-generated from code using Salvo's OpenAPI support.

### Frontend

1. **Error Boundaries**: Implemented to catch and display React errors gracefully.

2. **API Service Layer**: Centralized API calls in `services/api.ts` for better maintainability.

3. **Type Safety**: TypeScript strict mode enabled for maximum type safety.

4. **State Management**: Currently uses React hooks (useState, useEffect). For complex state, consider Redux or Zustand.

5. **Styling**: Tailwind CSS for utility-first styling approach.

## Communication Patterns

### API Communication
- **Protocol**: HTTP/1.1
- **Data Format**: JSON
- **Error Handling**: HTTP status codes + error messages
- **CORS**: Enabled for development (localhost:5173)

### Development Proxy
Vite dev server proxies `/api/*` requests to `localhost:8080` to avoid CORS issues during development.

## Security Considerations

1. **CORS**: Properly configured but needs production domain update
2. **Input Validation**: TODO - Add request validation
3. **Authentication**: TODO - Implement JWT or session-based auth
4. **Rate Limiting**: TODO - Add rate limiting middleware
5. **HTTPS**: TODO - Configure TLS for production

## Performance Considerations

1. **Backend**:
   - Async I/O with Tokio for high concurrency
   - Minimal allocations with Rust's zero-cost abstractions
   - TODO: Add database connection pooling

2. **Frontend**:
   - Code splitting with Vite
   - Lazy loading components
   - TODO: Implement virtual scrolling for large lists
   - TODO: Add service worker for offline support

## Future Architecture Plans

### Backend
- [ ] Add database layer (PostgreSQL or SQLite)
- [ ] Implement repository pattern
- [ ] Add caching layer (Redis)
- [ ] Implement authentication/authorization
- [ ] Add background job processing
- [ ] Implement rate limiting
- [ ] Add request validation middleware

### Frontend
- [ ] Implement routing (React Router)
- [ ] Add state management (Redux/Zustand)
- [ ] Implement real-time updates (WebSocket)
- [ ] Add offline support (Service Worker)
- [ ] Implement infinite scroll
- [ ] Add search and filtering
- [ ] Implement internationalization (i18n)

### DevOps
- [ ] Add Docker support
- [ ] Implement CI/CD pipeline
- [ ] Add automated testing
- [ ] Set up monitoring and logging
- [ ] Implement blue-green deployment

## Deployment Strategy

### Development
```bash
bun run dev    # Starts both frontend and backend
```

### Production
```bash
# Backend
cd backend && cargo build --release
./target/release/backend

# Frontend
cd frontend && npm run build
# Serve dist/ with nginx or static server
```

### Recommended Production Setup
```
┌─────────────┐
│   Nginx     │  Reverse Proxy
│   (443)     │  SSL Termination
└──────┬──────┘
       │
       ├─────────┐
       │         │
   Frontend   Backend
   (Static)   (8080)
```

## Testing Strategy

### Backend (TODO)
- Unit tests: `cargo test`
- Integration tests: API endpoint tests
- Load testing: k6 or vegeta

### Frontend (TODO)
- Unit tests: Vitest
- Component tests: React Testing Library
- E2E tests: Playwright or Cypress

## Monitoring and Observability

### Logging
- Backend: `tracing` crate with structured logging
- Frontend: Browser console + error reporting

### Metrics (TODO)
- Request latency
- Error rates
- Active users
- API endpoint usage

### Tracing (TODO)
- Distributed tracing with OpenTelemetry
- Request flow visualization

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development workflow and coding standards.

## License

MIT License - See [LICENSE](../LICENSE) for details.
