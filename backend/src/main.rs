use salvo::prelude::*;
use salvo::serve_static::StaticDir;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, ToSchema)]
#[salvo(schema(rename_all = "camelCase"))]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
}

#[endpoint]
async fn get_users() -> Json<Vec<User>> {
    Json(vec![
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
    ])
}

#[tokio::main] 
async fn main() {
    tracing_subscriber::fmt().init();

    let router = Router::new()
        .push(Router::with_path("/api/users").get(get_users));

    let doc = OpenApi::new("Backend API", "0.1.0")
        .merge_router(&router);

    let router = router
        .unshift(doc.into_router("/api-docs/openapi.json"))
        .unshift(SwaggerUi::new("/api-docs/openapi.json").into_router("/swagger-ui"));

    let acceptor = TcpListener::new("127.0.0.1:8080").bind().await;
    println!("🚀 后端服务启动：http://127.0.0.1:8080");
    println!("📚 Swagger UI：http://127.0.0.1:8080/swagger-ui");
    println!("📄 API文档：http://127.0.0.1:8080/api-docs/openapi.json");
    
    Server::new(acceptor).serve(router).await;
}
