const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const requestIdMiddleware = require('./requestIdMiddleware');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
});

const corsOptions = {
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

const loadMiddlewares = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(limiter);
    app.use(requestIdMiddleware);
}

module.exports = loadMiddlewares;