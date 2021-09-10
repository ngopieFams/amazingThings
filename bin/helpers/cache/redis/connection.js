const redis = require('redis');
const asyncRedis = require('async-redis');
const config = require('../../../infra/configs/global_config');
const logger = require('../../utils/logger');

const redisClient = () => {
  const redisConfig = config.get('/redisConfig');
  const options = {
    host:`${redisConfig.host}`,
    port:redisConfig.port,
    password: !redisConfig.password ? undefined : redisConfig.password,
    retry_strategy: function (options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    }
  };
  return redis.createClient(options);
};

const init = () => {
  const client = redisClient();
  client.on('error', (err) => {
    logger.log('redis-createConnection', err, 'error');
  });
  client.on('ready', () => {
    logger.log('redis-createConnection', 'success');
  });
};

// decorate redis client to async style
const getConnection = () => {
  return asyncRedis.decorate(redisClient());
};

module.exports = {
  init,
  getConnection
};


