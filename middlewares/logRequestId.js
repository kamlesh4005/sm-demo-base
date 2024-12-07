// File: middlewares/logRequestId.js
// const logger = require('../logger');

const logRequestId = (logger) => (req, res, next) => {
    const logWithId = (level, message) => {
      logger.log({ level, message, requestId: req.requestId });
    };
  
    req.log = {
      info: (message) => logWithId('info', message),
      error: (message) => logWithId('error', message),
    };
  
    next();
  };
  
  module.exports = logRequestId;
  