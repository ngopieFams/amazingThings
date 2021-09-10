const apm = require('../helpers/components/apm/apm');
apm.init();
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const userHandler = require('../modules/user/handlers/api_handler');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');
const sale = require('./sale');
const item = require('./item');
const config = require('../infra/configs/global_config');
const originServices = config.get('/corsOriginConfig');
const cors_origin =  require('../../cors-origin.json');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });
  let allowOrigins = ['*'];
  if(originServices === 'develop'){
    allowOrigins = cors_origin.develop
  } else if (originServices === 'release'){
    allowOrigins = cors_origin.release
  } else if (originServices === 'production') {
    allowOrigins = cors_origin.production
  }

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: allowOrigins,
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization','X-Requested-With','Content-Type','Accept'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // authenticated client can access the end point, place code bellow
  this.server.post('/users/v1/login', basicAuth.isAuthenticated, userHandler.postDataLogin);
  this.server.get('/users/v1/profile', jwtAuth.verifyToken, userHandler.getUser);
  this.server.post('/users/v1/register', basicAuth.isAuthenticated, userHandler.registerUser);
  

  sale.routes(this.server);
  item.routes(this.server);

  //Initiation
  mongoConnectionPooling.init();
}

module.exports = AppServer;
