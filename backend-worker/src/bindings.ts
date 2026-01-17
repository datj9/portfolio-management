export interface EnvBindings {
  DB: D1Database;
  CV_BUCKET?: R2Bucket;
  PUBLIC_BASE_URL?: string;
  CV_PUBLIC_PREFIX?: string;
  ADMIN_TOKEN?: string;
}
