const { utcToZonedTime, format } = require('date-fns-tz');
const moment = require("moment-timezone");
const eventsModel = require("../models/eventsModel");
const config = require("../configs/config.json")
const { startHours, endHours, timezone } = config.application;

/**
 * function for getting available slots for that day
 * @param {startDateTime} startDateTime
 * @param {startHours} startHours
 * @param {endHours} endHours
 * @param {slotDuration} slotDuration
 * @param {requestedTimezone} requestedTimezone
 * @param {bookedEvents} bookedEvents
 * @returns {Object} List of available slot of that day
 */
function getSlotsOfTheDay(startDateTime, startHours, endHours, slotDuration, timezone, requestedTimezone, bookedEvents) {
    const workingHours = {
        start: moment.tz(startDateTime, timezone).startOf('day').add(startHours, 'hours').toDate(),
        end: moment.tz(startDateTime, timezone).startOf('day').add(endHours, 'hours').toDate(),
    };
    const availableSlots = [];
    let currentSlot = workingHours.start;
    let slotEndTime = moment(currentSlot).add(slotDuration, 'minutes').toDate();

    while (slotEndTime <= workingHours.end) {
        if (!isSlotBooked(currentSlot, slotEndTime, bookedEvents) && moment().isSameOrBefore(currentSlot)) {
            // const originalDateTime = new Date(currentSlot);
            // // const convertedDateTime = utcToZonedTime(originalDateTime, requestedTimezone);
            // availableSlots.push(format(originalDateTime, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'))
            availableSlots.push(moment(currentSlot).tz(requestedTimezone).format());
        }
        currentSlot = slotEndTime;
        slotEndTime = moment.tz(slotEndTime, requestedTimezone).add(slotDuration, 'minutes').toDate();
    }
    return availableSlots;
}

/**
 * helper function for getSlotsOfTheDay
 * @param {startDateTime} startDateTime
 * @param {endDateTime} endDateTime
 * @param {bookedEvents} bookedEvents
 * @returns {Boolean} 
 */
function isSlotBooked(startDateTime, endDateTime, bookedEvents) {
    return bookedEvents.some((event) => {
        const eventStart = moment(event.startTime);
        const eventEnd = moment(event.endTime);
        return (
            (startDateTime >= eventStart && startDateTime < eventEnd) ||
            (endDateTime > eventStart && endDateTime <= eventEnd) ||
            (startDateTime <= eventStart && endDateTime >= eventEnd)
        );
    });
}

/**
 * function to check if slot is already available for the selected time
 * @param {startTime} startTime
 * @param {endTime} endTime
 * @returns {Boolean} 
 */
const getBookingByDateTime = async (startTime, endTime) => {
    const availableEvent = await eventsModel.fetchEventsByDateTime(startTime, endTime);
    return availableEvent ? true : false;
}

/**
 * function to check if incoming request timing are correct wrt available configs
 * @param {startTime} startTime
 * @param {endTime} endTime
 * @returns {Boolean} 
 */
const isValidAvailableTime = (startTime, endTime) => {
    const currentDate = moment(startTime).format('YYYY-MM-DD');
    const availableStartTime = moment.tz(currentDate, timezone).startOf('day').add(startHours, 'hours').toDate();
    const availableEndTime = moment.tz(currentDate, timezone).startOf('day').add(endHours, 'hours').toDate();
    if (moment(startTime).isBefore(availableStartTime) || moment(startTime).isAfter(availableEndTime) || moment(endTime).isBefore(availableStartTime) || moment(endTime).isAfter(availableEndTime)) {
        return false;
    }
    return true
}

module.exports = {
    getSlotsOfTheDay,
    isValidAvailableTime,
    getBookingByDateTime
}