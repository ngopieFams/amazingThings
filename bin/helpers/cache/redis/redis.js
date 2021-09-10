const asyncRedisClient = require('./connection').getConnection();
const logger = require('../../utils/logger');

/**
 * AsyncRedis is a class that contains all methods to manipulate cache.
 * This class is a result of decorated Redis Client.
 * All the methods can be used as async/sync function.
 */
class AsyncRedis {
  constructor(conn) {
    this.client = conn || asyncRedisClient;
    this.ctx = 'redis-client-';
  }

  /**
   * getValue will return value of cache key.
   */
  async getValue(key) {
    const ctx = this.ctx + 'getValue';
    return await this.client.get(key)
      .then(reply => {
        return serializer(reply);
      })
      .catch(err => {
        logger.log(ctx, err.message, 'error');
        return null;
      });
  }

  /**
   * getKeys will return value of cache key.
   */
  async getKeys(key) {
    const ctx = this.ctx + 'getKeys';
    return await this.client.keys(key)
      .then(reply => {
        return serializer(reply);
      })
      .catch(err => {
        logger.log(ctx, err.message, 'error');
        return null;
      });
  }

  /**
   * getAllHashValue will return all hashed value that turned into list (array).
   */
  async getAllHashValue(key) {
    const ctx = this.ctx + 'getAllHashValue';
    return await this.client.hgetall(key)
      .then(reply => {
        if (!reply) {
          return reply;
        }
        return serializer(reply, { hgetAll: true });
      })
      .catch(err => {
        logger.log(ctx, err.message, 'error');
        return null;
      });
  }

  /**
   * getHashValue will return value of a field (let say "id") based on the key.
   */
  async getHashValue(key, field) {
    const ctx = this.ctx + 'getHashValue';
    return await this.client.hget(key, field)
      .then(reply => {
        if (!reply) {
          return reply;
        }
        return serializer(reply);
      })
      .catch(err => {
        logger.log(ctx, err.message, 'error');
        return null;
      });
  }

  /**
   * checkTimeToLive will return life time of key and value in seconds.
   */
  async checkTimeToLive(key) {
    const ctx = this.ctx + 'checkTimeToLive';
    return await this.client.ttl(key)
      .then(reply => {
        if (reply < 0) {
          return null;
        }
        return serializer(reply);
      })
      .catch(err => {
        logger.log(ctx, err.message, 'error');
        return null;
      });
  }

  async deleteValue(key) {
    const ctx = this.ctx + 'setValue';
    this.client.del(key)
      .then((_) => {
        logger.log(ctx, 'deleteValue success', 'info');
      })
      .catch((err) => {
        logger.log(ctx, err.message, 'error');
      });
  }

  /**
   * setValue act as a command that will cache value by its key.
   */
  async setValue(key, value) {
    const ctx = this.ctx + 'setValue';
    return await this.client.set(key, stringify(value))
      .then((_) => {
        logger.log(ctx, 'setValue success', 'info');
      })
      .catch((err) => {
        logger.log(ctx, err.message, 'error');
      });
  }

  /**
   * hsetValue act as a command that will cache value on a field (let say "id") based on the key.
   */
  async hsetValue(key, field, value) {
    const ctx = this.ctx + 'hsetValue';
    return await this.client.hset(key, field, stringify(value))
      .then((_) => {
        logger.log(ctx, 'hsetValue success', 'info');
      })
      .catch((err) => {
        logger.log(ctx, err.message, 'error');
      });
  }

  /**
   * setExpire act as a command that will cache value by its key on range of time.
   * Parameter options will let you to set time format of expired.
   * 's' is seconds, 'm' is minutes, 'h' is hours, 'd' is days.
   * The default and cached time format format is second. So, if the timeFormat is set to "d",
   * it will be multiplied like "expireIn * 60 * 60 * 24".
   */
  async setExpire(key, value, expireIn = 10, options = { timeFormat: 's' }) {
    const ctx = this.ctx + 'setExpire';
    if(expireIn < 5 && options.timeFormat === 's') {
      const error = new SyntaxError();
      error.message = 'expireIn cannot be set less than 5';
      logger.log(ctx, error.message, 'error');
      return error;
    }
    let expire = 0;
    switch (options.timeFormat) {
    case 's':
      expire = expireIn * 1;
      break;
    case 'm':
      expire = expireIn * 60;
      break;
    case 'h':
      expire = expireIn * 60 * 60;
      break;
    case 'd':
      expire = expireIn * 60 * 60 * 24;
      break;
    default:
      expire = expireIn * 1;
      break;
    }

    return await this.client.setex(key, expire, stringify(value))
      .then((_) => {
        logger.log(ctx, 'setExpire success', 'info');
      })
      .catch((err) => {
        logger.log(ctx, err.message, 'error');
      });
  }
}


const stringify = (args) => {
  if (args instanceof Object || args instanceof Array) {
    return JSON.stringify(args);
  }
  return args.toString();
};

const serializer = (args, options = { hgetAll: false }) => {
  const ctx = 'cache-serializer';
  try {
    if (options.hgetAll) {
      args = hgetAllSerializer(args);
    }
    const result = JSON.parse(args);
    return result;
  } catch (err) {
    if (err instanceof SyntaxError) {
      return args;
    }
    logger.log(ctx, err.message, 'error');
  }
};

const hgetAllSerializer = (args) => {
  const arrData = [];
  Object.keys(args).forEach(key => {
    arrData.push(serializer(args[key]));
  });
  return arrData;
};

module.exports = AsyncRedis;
