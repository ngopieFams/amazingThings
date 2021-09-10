const basicAuth = require('../auth/basic_auth_helper');
const userHandler = require('../modules/user/handlers/api_handler');

const routes = (server)=>{
  server.post('/user/v2', [], userHandler.postDataLogin);
};

module.exports ={
  routes
};
