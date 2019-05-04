/**
 * Import libraries
 */

const express       = require('express');
const logger        = require('morgan');
const dotenv        = require('dotenv');
const engine        = require('ejs-mate');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const flash         = require('express-flash');

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

// Set the views directory and view engine to ejs
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

/**
 * Configure middlewares
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(session({
    resave : true,
    saveUninitialized : true,
    secret : "Sarthak!@:@/(8*-"
}));

app.use(flash());

// Set the default directory for static content
app.use(express.static(__dirname + '/public'));
/**
 * Configure routes
 */

app.use(require('./routes/index'));
app.use(require('./routes/main'));
app.use(require('./routes/user'));

module.exports = app;