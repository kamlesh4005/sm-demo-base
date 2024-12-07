// const { createLogger, format, transports } = require("winston");
// require("winston-daily-rotate-file");

// const logFormat = format.combine(
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] [RequestID: ${info.requestId || 'N/A'}]: ${info.message}`)
//   );
  

// const logger = createLogger({
//   level: "info",
//   format: logFormat,
//   transports: [
//     new transports.Console(),
//     new transports.DailyRotateFile({
//       filename: "../logs/application-%DATE%.log",
//       datePattern: "YYYY-MM-DD",
//       zippedArchive: true,
//       maxSize: "20m",
//       maxFiles: "14d",
//       level: "info",
//     }),
//     new transports.DailyRotateFile({
//       filename: "../logs/error-%DATE%.log",
//       datePattern: "YYYY-MM-DD",
//       zippedArchive: true,
//       maxSize: "20m",
//       maxFiles: "30d",
//       level: "error",
//     }),
//   ],
//   exceptionHandlers: [
//     new transports.DailyRotateFile({
//       filename: "../logs/exceptions-%DATE%.log",
//       datePattern: "YYYY-MM-DD",
//       zippedArchive: true,
//       maxSize: "20m",
//       maxFiles: "14d",
//     }),
//   ],
// });

// const logWithRequestId = (level, message, requestId) => {
//   logger.log({ level, message, requestId });
// };

// console.log = (...args) => {
//   const message = args
//     .map((arg) =>
//       typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
//     )
//     .join(" ");
//   logWithRequestId("info", message, global.requestId);
// };

// console.error = (...args) => {
//   const message = args
//     .map((arg) =>
//       typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
//     )
//     .join(" ");
//   logWithRequestId("error", message, global.requestId);
// };

// module.exports = logger;

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] [RequestID: ${info.requestId || 'N/A'}]: ${info.message}`)
);

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, '../../logs/application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info'
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, '../logs/error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error'
    })
  ],
  exceptionHandlers: [
    new transports.DailyRotateFile({
      filename: path.join(__dirname, '../logs/exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

console.log = (...args) => {
  const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)).join(' ');
  logger.info(message, { requestId: 'N/A' });
};

console.error = (...args) => {
  const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)).join(' ');
  logger.error(message, { requestId: 'N/A' });
};

module.exports = logger;
