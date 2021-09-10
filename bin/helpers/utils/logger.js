const winston = require('winston');
const morgan  = require('morgan');
require('winston-logstash');
const config = require('../../infra/configs/global_config');

let logger = {}

const log = (context, message, scope) => {
  // const obj = {
  //   context,
  //   scope,
  //   message: message.toString()
  // };
  // logger.info(obj);
};

const info = (context, message, scope, meta) => {
  const obj = {
    context,
    scope,
    message: message,
    meta
  };
  //logger.info(obj);
};

const error = (context, message, scope, meta) => {
  const obj = {
    context,
    scope,
    message: message,
    meta
  };
  //logger.error(obj);
};

const init = () => {
  return null;
};

module.exports = {
  log,
  init,
  info,
  error
};