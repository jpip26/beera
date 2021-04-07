const DATABASE_CONFIG = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  NAME: process.env.DB_NAME,
  SSL: process.env.DB_SSL ? (process.env.DB_SSL === '1') : 1,
}

export default DATABASE_CONFIG;
