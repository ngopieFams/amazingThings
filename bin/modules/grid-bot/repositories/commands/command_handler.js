
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const startBot = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.startBot(payload);
  return postCommand(payload);
};

const inputGrid = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.inputGrid(payload);
  return postCommand(payload);
};

module.exports = {
  startBot,
  inputGrid
};
