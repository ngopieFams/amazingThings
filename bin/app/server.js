const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');
const market = require('./market');
const gridbot = require('./grid-bot');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });
  let allowOrigins = ['*'];

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
  

  market.routes(this.server);
  gridbot.routes(this.server);

  //Initiation
  mongoConnectionPooling.init();
}

module.exports = AppServer;
