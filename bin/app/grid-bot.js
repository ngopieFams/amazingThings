const basicAuth = require('../auth/basic_auth_helper');
const gridBotHandler = require('../modules/grid-bot/handlers/api_handler');

const routes = (server)=>{
  server.post('/api/gridBot/v1/start-stop', basicAuth.isAuthenticated, gridBotHandler.startBot);
  server.post('/api/gridBot/v1/inputGrid', basicAuth.isAuthenticated, gridBotHandler.inputGrid);
};

module.exports ={
  routes
};
