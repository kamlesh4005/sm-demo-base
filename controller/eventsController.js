const eventsModel = require("../models/eventsModel");
const moment = require("moment-timezone");
const { setCache, getCache } = require("../utils/cache");
const axios = require("axios");
const responses = require("../configs/responses.json");
const config = require("../configs/config.json");

/**
 * function to get all the booked events
 * @param {payload.startDate} startDate
 * @param {payload.endDate} endDate
 * @param {requestedTimezone} requestedTimezone
 * @returns {Object} Date wise list of available slots
 */
const getAllEvents = async (payload) => {
  // This is dummy API for the testing part

  console.log("payload data", payload);

  const cacheKey = "demoKey2";
  console.time("redisTime");
  const cachedValue = await getCache(cacheKey);
  console.timeEnd("redisTime");
  if (cachedValue) {
    console.log("cached value", cachedValue);
  } else {
    console.time("redisTimeNew");
    await setCache(cacheKey, Math.floor(1000 + Math.random() * 9000), 10);
    console.timeEnd("redisTimeNew");
  }
  return new Promise(function (resolve, reject) {
    const { skip, limit } = payload;
    const skipNumber = parseInt(skip) || 0;
    const limitNumber = parseInt(limit) || 100;
    let startDate = payload.startDate ? moment(payload.startDate) : moment();
    let endDate = payload.endDate
      ? moment(payload.endDate).add(1, "day")
      : moment().add(7, "days");
    console.time("dbTime");
    return eventsModel
      .getAllEvents(startDate, endDate, { skipNumber, limitNumber })
      .then((events) => {
        console.timeEnd("dbTime");
        return resolve(events);
      })
      .catch((error) => {
        return reject(error, error.statusCode || 500);
      });
  });
};

const executeProxy = async (payload) => {
    const { url, method, headers, params, data, auth } = payload;

    if (!url || !method) {
        throw new Error("URL and method are required");
    }

    try {
        const response = await axios({
            url,
            method,
            headers,
            params,
            data,
            auth
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else if (error.request) {
            throw new Error("No response received from the API");
        } else {
            throw new Error(error.message);
        }
    }
};

const getPredefinedResponse = async (payload) => {
  try {
    console.log("payload data", payload);
    const key = payload?.key;
    console.log("🚀 ~ getPredefinedResponse ~ key:", key, responses[key])
    return key && responses[key] ? responses[key] : [];
  } catch (error) { 
    console.error("Error at service layer : getOnlineData : ", error);
    throw new Error("Failed to fetch online data");
  }
}

const getGames = async () => {
  try {
    const response = await axios({
      url: "https://dream.bagpackkar.com/d110923/shyamp/getGames",
      method: "GET",
      headers: {},
      params: {}
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error.message);
    return {
      statusCode: 403,
      message: config.message.ipMessage
    }
  }
};

const getSeries = async (sportId) => {
  try {
    const response = await axios({
      url: `https://dream.bagpackkar.com/d110923/shyamp/getSeries`,
      method: "GET",
      headers: {},
      params: { sport_id: sportId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching series:", error);
    return {
      statusCode: 403,
      message: config.message.ipMessage
    }
  }
};

const getMatches = async (seriesId, gameId) => {
  try {
    const response = await axios({
      url: `https://dream.bagpackkar.com/d110923/shyamp/getMatches`,
      method: "GET",
      headers: {},
      params: { 
        series_id: seriesId,
        game_id: gameId 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    return {
      statusCode: 403,
      message: config.message.ipMessage
    }
  }
};

const getMarket = async (matchId) => {
  try {
    const response = await axios({
      url: `https://dream.bagpackkar.com/d110923/shyamp/getMarket`,
      method: "GET",
      headers: {},
      params: { 
        match_id: matchId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching market:", error);
    return {
      statusCode: 403,
      message: config.message.ipMessage
    }
  }
};

const getFancy = async (matchId) => {
  try {
    const response = await axios({
      url: `https://dream.bagpackkar.com/api/switch/getFancy`,
      method: "GET",
      headers: {},
      params: { 
        matchId: matchId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching fancy:", error.message);
    return {
      statusCode: 403,
      message: config.message.ipMessage
    }
  }
};

const getBM = async (matchId) => {
  try {
    const response = await axios({
      url: `https://dream.bagpackkar.com/api/switch/getBM`,
      method: "GET",
      headers: {},
      params: { 
        matchId: matchId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching BM:", error.message);
    return {
      statusCode: 403,
      message: config.message.ipMessage
    }
  }
};

const getOddsList = async (marketId) => {
  try {
    const response = await axios({
      url: `https://dream.bagpackkar.com/d110923/shyamp/getOddsList`,
      method: "GET",
      headers: {},
      params: { 
        marketid: marketId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching odds list:", error.message);
    return {
      statusCode: 403,
      message: config.message.ipMessage
    }
  }
};

module.exports = {
  getAllEvents,
  getGames,
  getSeries,
  getMatches,
  getMarket,
  getFancy,
  getBM,
  getOddsList,
  getPredefinedResponse,
  executeProxy
};
