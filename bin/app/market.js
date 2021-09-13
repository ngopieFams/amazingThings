const basicAuth = require('../auth/basic_auth_helper');
const userHandler = require('../modules/market/handlers/api_handler');

const routes = (server)=>{
  server.get('/market/v1/exchangeInfo', [], userHandler.exchangeInfo);
};

module.exports ={
  routes
};
