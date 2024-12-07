const redis = require('../services/redis');

const setCache = (key, value, expireTimeInSeconds) => {
  return new Promise((resolve, reject) => {
    redis.set(key, value, 'EX', expireTimeInSeconds, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const getCache = (key) => {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteCache = (key) => {
  return new Promise((resolve, reject) => {
    redis.del(key, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  setCache,
  getCache,
  deleteCache
};
