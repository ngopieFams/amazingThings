
const Market = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const market = new Market(db);

const exchangeInfo = async (query) => {
  const getData = async (query) => {
    const result = await market.exchangeInfo(query);
    return result;
  };
  const result = await getData(query);
  return result;
};

module.exports = {
  exchangeInfo
};
