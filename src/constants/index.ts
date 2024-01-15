export const TOKEN = "token";

export const PUBLIC_ROUTES = ["/", "/api/login", "/api/logout"];

export const SECRET = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);
