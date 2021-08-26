const express = require('express');
//declaring morgan  middleware
const morgan = require('morgan');
//const { get } = require('http');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controlers/errorControler');

const app = express();

//1) Middlewares*************************************************************

// if (process.env.NODE_ENV === 'development') {
//   //logger midleware

console.log(process.env.NODE_ENV);
// }
if (process.env.NODE_ENV !== 'development') {
  console.log(process.env.NODE_ENV === 'development');
  app.use(morgan('dev'));
}

const tourRouter = require('./routes/toursRoute');
const userRouter = require('./routes/usersRoute');

//W e declare a midleware, its a function that can modify the incomming request data. It called  midleware because its stand between the request and the response. the midleware her is {express.json}
app.use(express.json());

app.use(express.static(`${__dirname}/public`)); //in order to serve an static file
//create myown midleware

app.use((req, res, next) => {
  req.SalimTime = new Date().toISOString();

  next();
});

//In order to connect these two route with the app, we call this mounting a new router in the route
app.use('/api/v1/tours', tourRouter);
//o route with the app, we call this mounting a new router in the route
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //when we pass an argument to the next(), exress will undrestand that htis an error so the application will go dirct to the global error handler
}); //all means for all http methode(get,  post...)

app.use(globalErrorHandler); //Global Error handler middleware

module.exports = app;
