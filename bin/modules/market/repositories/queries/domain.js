
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const config = require('../../../../infra/configs/global_config');

class Market {

  constructor(db){
    this.query = new Query(db);
  }

  async exchangeInfo() {
    const retrieveExchangeInfo = await this.query.getExchangeInformation();
    if(retrieveExchangeInfo.err){
      return wrapper.error(new NotFoundError('Data Tidak Ditemukan'));
    }
    return wrapper.data(retrieveExchangeInfo.data);
  }

}

module.exports = Market;
