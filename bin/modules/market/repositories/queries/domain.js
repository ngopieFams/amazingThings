
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const config = require('../../../../infra/configs/global_config');

class Market {

  constructor(db){
    this.query = new Query(db);
  }

  async exchangeInfo(query) {
    const retrieveExchangeInfo = await this.query.getExchangeInformation(query);
    if(retrieveExchangeInfo.err){
      return wrapper.error(new NotFoundError('Data Tidak Ditemukan'));
    }
    const {data} = retrieveExchangeInfo;
    const result = data.symbols;
    const date = new Date(data.serverTime);
    const meta = {
      timezone: data.timezone,
      serverTime: date.toString(),
      rateLimits:data.rateLimits,
      exchangeFilters:data.exchangeFilters
    };
    return wrapper.paginationData(result,meta);
  }

}

module.exports = Market;
