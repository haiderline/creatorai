export interface D1Result<T = unknown> { results?: T[]; success: boolean; meta?: { changes?: number }; }
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}
export interface Env {
  DB?: D1Database;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  APP_ORIGIN?: string;
}
export interface AuthUser { id: string; email?: string; }
export interface PagesContext {
  request: Request;
  env: Env;
  params: Record<string, string>;
}
