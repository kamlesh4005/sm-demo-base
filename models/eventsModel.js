const Event = require("./schemas/events.schema");
const Error = require("../customError");
const moment = require("moment-timezone");

const createEvent = async (event) => {
    return new Promise(function (resolve, reject) {
        const { title, startTime, endTime } = event;
        const timezone = event.requestedTimezone;
        const newEvent = new Event({
            title, startTime, endTime, timezone
        })
        resolve(newEvent.save())
            .catch((error) => {
                console.error("Error at mode layer : createEvent : ", error);
                reject(new Error(error, 502));
            });
    })
}

const fetchEventsByDateTime = async (startTime, endTime) => {
    return new Promise(function (resolve, reject) {
        const query = {
            $and: [
                { startTime: { $lt: new Date(endTime) } },
                { endTime: { $gt: new Date(startTime) } }
            ]
        }
        return resolve(Event.findOne(query))
            .catch((error) => {
                console.error("Error at mode layer : fetchEventsByDateTime : ", error);
                reject(new Error(error, 502));
            });
    })
}

const getAllEvents = async (startDate, endDate, options = {}) => {
    return new Promise(function (resolve, reject) {
        const query = {};
        if (startDate) {
            query["startTime"] = {
                $gte: moment(startDate)
            }
        } else {
            query["startTime"] = {
                $gte: moment()
            }
        }
        if (endDate) {
            query["endTime"] = {
                $lte: moment(endDate)
            }
        }
        if (options.skipNumber && options.limitNumber) {
            return resolve(Event.find(query).sort({ startTime: 1 }).skip(options.skipNumber).limit(options.limitNumber).lean())
                .catch((error) => {
                    console.error("Error at mode layer : getAllEvents : ", error);
                    reject(new Error(error, 502));
                });
        } else {
            return resolve(Event.find(query).sort({ startTime: 1 }).lean())
                .catch((error) => {
                    console.error("Error at mode layer : getAllEvents : ", error);
                    reject(new Error(error, 502));
                });
        }
    })
}
module.exports = {
    createEvent,
    fetchEventsByDateTime,
    getAllEvents
}