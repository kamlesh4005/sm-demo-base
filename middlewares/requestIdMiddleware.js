// File: middlewares/requestIdMiddleware.js

//const { v4: uuidv4 } = require('uuid');

const requestIdMiddleware = (req, res, next) => {
  req.requestId = "1234"// uuidv4();
  next();
};

module.exports = requestIdMiddleware;
