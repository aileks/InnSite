const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
);

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = 'Resource Not Found';
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = !isProduction ? 'Validation error' : undefined;
    err.errors = errors;
    if (!err.status) err.status = 400;
  }
  next(err);
});

// patch job for production error codes & responses
app.use((err, _req, _res, next) => {
  // AUTH required 401 unauthorized
  if (err.title === 'Authentication required' && err.status === 401) {
    err.errors = undefined;
  }

  // duplicate username/email signup
  if (err.errors && err.errors.email === 'email must be unique') {
    err.title = 'User already exists';
    err.errors.email = 'User with that email already exists';
    err.status = 500;
  }
  if (err.errors && err.errors.username === 'username must be unique') {
    err.title = 'User already exists';
    err.errors.username = 'User with that username already exists';
    err.status = 500;
  }

  // login failed
  if (err.title === 'Login failed' && err.status === 401) {
    err.title = 'Invalid credentials';
    err.errors = undefined;
  }

  // edit review invalid body
  if (
    err.errors &&
    (err.errors.review === 'Review text is required' ||
      err.errors.stars === 'Stars must be an integer from 1 to 5')
  ) {
    err.title = 'Bad Request';
  }

  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    title: !isProduction ? (err.title ? err.title : 'Server Error') : undefined,
    message: err.title,
    errors: err.errors,
    stack: isProduction ? undefined : err.stack,
  });
});

module.exports = app;
