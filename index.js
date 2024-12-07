require('dotenv').config();
const express = require("express");
const path = require('path');
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

const config = {
    server: {
        port: process.env.PORT || 3010,
    },
};
const connectDB = require("./models/db");
const loadMiddlewares = require("./middlewares");
const requestIdMiddleware = require("./middlewares/requestIdMiddleware");
const logRequestId = require('./middlewares/logRequestId');
const routes = require("./routes/events");
const logger = require('./logger');

const app = express();

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < 1; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.error(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);

    app.use(express.static(path.join(__dirname, 'client')));
    app.use(express.json());

    app.use(requestIdMiddleware);
    app.use(logRequestId(logger));

    console.log("Loading middlewares");
    loadMiddlewares(app);

    console.log("Connecting to DB");
    connectDB()
        .then(() => console.log("Database connected successfully"))
        .catch((err) => {
            console.error("Database connection failed:", err.message);
            process.exit(1);
        });

    app.use("/api", routes);

    app.use((req, res, next) => {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    });

    app.use((err, req, res, next) => {
        console.error(err.message, err.stack);
        res.status(err.status || 500).send({
            code: err.status || 500,
            message: process.env.NODE_ENV === 'production' ? "Internal Server Error" : err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
        });
    });

    const port = config.server.port;
    app.listen(port, () => {
        console.log(`Worker ${process.pid} is running on port: ${port}`);
    });
}