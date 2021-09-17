require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  mongoDbUrl: process.env.MONGO_DATABASE_URL,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  postgreConfig:{
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    max:  process.env.POSTGRES_MAX,
    idleTimeoutMillis: process.env.POSTGRES_TIMEOUT

  },
  redisConfig: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  },
  binanceConfig: {
    apiKey: process.env.API_KEY,
    secretKey: process.env.SECRET_KEY,
    domain: process.env.BINANCE_DOMAIN
  },
  corsOriginConfig: process.env.CORS_ORIGIN,
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
