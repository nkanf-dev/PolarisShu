use salvo::cors::{Cors, CorsHandler};
use salvo::http::Method;
use salvo::prelude::*;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use tracing::info;
use tracing_subscriber::{EnvFilter, layer::SubscriberExt, util::SubscriberInitExt};

// ============================================================================
// Models
// ============================================================================

/// User model representing a user in the system
#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
#[salvo(schema(rename_all = "camelCase"))]
pub struct User {
    /// Unique identifier for the user
    pub id: String,
    /// User's full name
    pub name: String,
    /// User's email address
    pub email: String,
}

/// Health check response
#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct HealthResponse {
    /// Service status
    pub status: String,
    /// Service version
    pub version: String,
    /// Server timestamp
    pub timestamp: i64,
}

// ============================================================================
// Handlers
// ============================================================================

/// Get list of all users
///
/// Returns a list of all users in the system.
#[endpoint]
async fn get_users() -> Json<Vec<User>> {
    info!("Fetching user list");

    // TODO: Replace with actual database query
    let users = vec![
        User {
            id: "1".to_string(),
            name: "Alice".to_string(),
            email: "alice@example.com".to_string(),
        },
        User {
            id: "2".to_string(),
            name: "Bob".to_string(),
            email: "bob@example.com".to_string(),
        },
    ];

    Json(users)
}

/// Health check endpoint
///
/// Returns the health status of the service.
#[endpoint]
async fn health_check() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs() as i64,
    })
}

// ============================================================================
// Configuration
// ============================================================================

/// Create and configure CORS handler
fn create_cors_handler() -> CorsHandler {
    Cors::new()
        .allow_origin("http://localhost:5173") // Frontend dev server
        .allow_methods(vec![
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::OPTIONS,
        ])
        .allow_headers(vec!["Content-Type", "Authorization"])
        .max_age(Duration::from_secs(3600))
        .into_handler()
}

/// Initialize tracing subscriber for logging
fn init_tracing() {
    let env_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info,backend=debug"));

    tracing_subscriber::registry()
        .with(env_filter)
        .with(tracing_subscriber::fmt::layer())
        .init();
}

// ============================================================================
// Application Entry Point
// ============================================================================

#[tokio::main]
async fn main() {
    // Initialize logging
    init_tracing();

    info!("Starting PolarisShu backend service...");

    // Create API router
    let api_router = Router::new()
        .push(Router::with_path("/api/health").get(health_check))
        .push(Router::with_path("/api/users").get(get_users));

    // Create OpenAPI documentation
    let doc =
        OpenApi::new("PolarisShu Backend API", env!("CARGO_PKG_VERSION")).merge_router(&api_router);

    // Combine all routes
    let router = Router::new()
        .hoop(create_cors_handler()) // CORS middleware
        .push(api_router)
        .push(doc.into_router("/api-docs/openapi.json"))
        .push(SwaggerUi::new("/api-docs/openapi.json").into_router("/swagger-ui"));

    // Start server
    let acceptor = TcpListener::new("127.0.0.1:8080").bind().await;

    info!("✅ Server initialized successfully");
    println!();
    println!("{:=^60}", "");
    println!("{:^60}", "🚀 PolarisShu Backend Service");
    println!("{:-^60}", "");
    println!("📍 Server:      http://127.0.0.1:8080");
    println!("💚 Health:      http://127.0.0.1:8080/api/health");
    println!("📚 Swagger UI:  http://127.0.0.1:8080/swagger-ui");
    println!("📄 OpenAPI:     http://127.0.0.1:8080/api-docs/openapi.json");
    println!("{:=^60}", "");
    println!();

    Server::new(acceptor).serve(router).await;
}
