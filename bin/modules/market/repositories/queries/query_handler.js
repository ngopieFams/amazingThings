
const Market = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const market = new Market(db);

const exchangeInfo = async () => {
  const getData = async () => {
    const result = await market.exchangeInfo();
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  exchangeInfo
};
