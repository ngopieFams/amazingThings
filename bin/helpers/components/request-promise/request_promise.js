const rp = require('request-promise');
const wrapper = require('../../utils/wrapper');
const { InternalServerError } = require('../../../helpers/error');
const logger = require('../../../helpers/utils/logger');

const requestPromise = async (options)=>{
  options.json = true;
  return await rp(options).then((res)=>{
    if(res.errorcode){
      logger.log('requestPromise',`error response code : ${res.errorcode}`,'info');
      return wrapper.error(new InternalServerError('Failed Request Data'));
    }
    if(!res.success){
      logger.log('requestPromise',`error response code : ${res.errorcode}`,'info');
      return wrapper.error(new InternalServerError('Failed Request Data'));
    }
    return wrapper.data(res.data);
  }).catch((_)=>{
    logger.log('requestPromise','error while getting from api','info');
    return wrapper.error(new InternalServerError('Failed Request Data'));
  });
};

const requestPromiseFullResponse = async (options)=>{
  options.resolveWithFullResponse = true;
  return await rp(options).then((res)=>{
    return wrapper.data(res);
  }).catch((_)=>{
    logger.log('requestPromiseFullResponse','error while getting from api','info');
    return wrapper.error(new InternalServerError('Failed Request Data'));
  });
};

module.exports ={
  requestPromise,
  requestPromiseFullResponse
};