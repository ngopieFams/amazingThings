
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError, UnauthorizedError, ConflictError } = require('../../../../helpers/error');

class GridBot {

  constructor(db){
    this.command = new Command(db);
  }

  async startBot(payload) {
    const ctx = 'domain-startBot';
    const { status } = payload;

    return wrapper.data(status);
  }

  async inputGrid(payload) {
    const ctx = 'domain-inputGrid';
    const { totalGrid } = payload;

    return wrapper.data(totalGrid);

  }
  /*
    Aritmetika: Setiap grid memiliki perbedaan harga yang sama.
    Grid aritmetis membagi rentang harga dari grid_lower_limit ke grid_upper_limit menjadi grid_count dengan selisih harga yang setara.
    Selisih harga setiap grid adalah:
    price_diff = (grid_upper_limit - grid_lower_limit) / grid_count
    Kemudian, selisih tersebut membuat serangkaian interval harga:
    price_1 = grid_lower_limit
    price_2 = grid_lower_limit + price_diff
    price_3 = grid_lower_limit + price_diff * 2
    ...
    price_n = grid_lower_limit + price_diff * (n-1)
    Pada grid_upper_limit，n = grid_count
    Contoh: Perbedaan harga aritmetika = 100:1000, 1100, 1200, 1300, 1400,... (harga berikutnya adalah lebih tinggi 100 dari harga sebelumnya)
    Geometris: Setiap grid memiliki rasio perbedaan harga yang sama.
    Grid geometris membagi rentang harga dari grid_lower_limit ke grid_upper_limit menjadi grid_count dengan rasio harga yang setara.
    Rasio harga setiap grid adalah:
    price_ratio = (grid_upper_limit / grid_lower_limit) ^ (1/grid_count)
    Selisih harga setiap grid adalah:
    price_diff_percentage = ( (grid_upper_limit / grid_lower_limit) ^ (1/grid_count) - 1) * 100%
    Kemudian, selisih tersebut membuat serangkaian interval harga:
    price_1 = grid_lower_limit
    price_2 = grid_lower_limit* price_ratio
    price_3 = grid_lower_limit * price_ratio ^ 2
    ...
    price_n = grid_lower_limit* price_ratio ^ (n-1)
    Pada grid_upper_limit，n = grid_count
    Contoh: grid price_diff_percentage geometris = 10%: 1000, 1100, 1210, 1331, 1464,1,... (harga berikutnya adalah 10% lebih tinggi daripada yang sebelumnya)
  */

}

module.exports = GridBot;
