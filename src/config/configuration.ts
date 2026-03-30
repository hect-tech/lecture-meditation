export default () => ({
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  debug: process.env.DEBUG || true,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'lecture',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || '1234',
  },
});