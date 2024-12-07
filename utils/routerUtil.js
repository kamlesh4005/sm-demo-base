const { body, query, validationResult } = require('express-validator');
const moment = require("moment-timezone");

function validateFreeSlotAPI() {
    return [
        query('startDate').isISO8601().withMessage('Invalid startDate format. Must be in ISO 8601 format.')
            .custom((value, { req }) => {
                const currentTime = new Date();
                currentTime.setDate(currentTime.getDate() - 1);
                const yesterday = currentTime.toISOString().split('T')[0];

                const inputDate = value.split('T')[0];
                if (inputDate < yesterday) {
                    throw new Error('Start time must be after or same as yesterday.');
                }
                return true;
            }),

        query('endDate').isISO8601().withMessage('Invalid endDate format. Must be in ISO 8601 format.')
            .custom((value, { req }) => {
                const currentTime = new Date();
                currentTime.setDate(currentTime.getDate() - 1);
                const yesterday = currentTime.toISOString().split('T')[0];

                const inputDate = value.split('T')[0];
                if (inputDate < yesterday) {
                    throw new Error('Start time must be after or same as yesterday.');
                }
                return true;
            }),
        query('timezone').custom((value) => {
            if (!moment.tz.zone(value)) {
                throw new Error('Identified invalid timezone.');
            }
            return true;
        }),
    ];
}
function validateEventsAPI() {
    return [
        body('startTime').isISO8601().withMessage('Invalid startDate format. Must be in ISO 8601 format.')
            .custom((value, { req }) => {
                const currentTime = new Date();
                currentTime.setDate(currentTime.getDate() - 1);
                const yesterday = currentTime.toISOString().split('T')[0];

                const inputDate = value.split('T')[0];
                if (inputDate < yesterday) {
                    throw new Error('Start time must be after or same as yesterday.');
                }
                return true;
            }),
        body('title').exists().withMessage('Title is required.')
            .isString().withMessage('Title must be a string.'),
        body('timezone').custom((value) => {
            if (!moment.tz.zone(value)) {
                throw new Error('Identified invalid timezone.');
            }
            return true;
        }),
    ];
}

module.exports = {
    validateFreeSlotAPI,
    validateEventsAPI
}