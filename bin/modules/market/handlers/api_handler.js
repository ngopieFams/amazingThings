
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const exchangeInfo = async (req, res) => {
  const query = req.query;
  const getData = async (query) => queryHandler.exchangeInfo(query);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Data', httpError.NOT_FOUND)
      : wrapper.paginationResponse(res, 'success', result, 'Get Data', http.OK);
  };
  sendResponse(await getData(query));
};

module.exports = {
  exchangeInfo
};
