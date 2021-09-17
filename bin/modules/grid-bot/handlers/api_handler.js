
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const startBot = async (req, res) => {
  const payload = req.body;
  const postData = async (payload) => commandHandler.startBot(payload);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'start bot', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'start bot', http.OK);
  };
  sendResponse(await postData(payload));
};

const inputGrid = async (req, res) => {
  const payload = req.body;
  const postData = async (payload) => commandHandler.inputGrid(payload);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Data', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Data', http.OK);
  };
  sendResponse(await postData(payload));
};

module.exports = {
  startBot,
  inputGrid
};
