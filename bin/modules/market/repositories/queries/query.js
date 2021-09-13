const rp = require('../../../../helpers/components/request-promise/request_promise');
const config=require('../../../../infra/configs/global_config');
const binanceConfig = config.get('/binanceConfig');

class Query {

  constructor(db) {
    this.db = db;
  }

  async getExchangeInformation(query) {
    const options = {
      url: `${binanceConfig.domain}/api/v3/exchangeInfo`,
      headers: {
        'Content-Type': 'application/json',
        method:'GET'
      },
      qs:{
        ...query
      }
    };
    const recordset= await rp.requestPromise(options);
    return recordset;
  }

}

module.exports = Query;
