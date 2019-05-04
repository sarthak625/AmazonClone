/**
 * Import libraries
 */

const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');

// Initialize express
const app = express();
// Configure env vars if not prod, Recommended to set env variables at the production docker container / machine
if (process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

/**
 * Connect to DB
 */
require('./db/connect_db');

/**
 * Configure middlewares
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

/**
 * Configure routes
 */

app.use('/',require('./routes/index'));

module.exports = app;