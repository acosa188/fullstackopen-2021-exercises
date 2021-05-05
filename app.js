const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");

// Connect to database
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})
.then(()=> logger.info("connected to the mongo database"))
.catch(error => logger.error("failed to connect to mongo database", error.message))

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// router middleware
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;