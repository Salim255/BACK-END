const path = require('path'); //to manipulate passe name
const express = require('express');
//declaring morgan  middleware
const morgan = require('morgan');
//const { get } = require('http');

//**SECURITY**//
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controlers/errorControler');
const tourRouter = require('./routes/toursRoute');
const userRouter = require('./routes/usersRoute');
const reviewRouter = require('./routes/reviewsRoute');

const app = express();

//PUG ENGINE tell Express the template that we gonna use
app.set('view engine', 'pug'); // we dont need to install pug or require it
//We need also de define wher this view is located in the file system, PUG template called views in Express
app.set('views', path.join(__dirname, 'views')); //this will create the path to views folder

//1)Golobal Middlewares**************************************************************//

//Serving static files
//app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

//Set Security HTTP header
app.use(helmet()); //see the documention on google

//Development logging
if (process.env.NODE_ENV !== 'development') {
  app.use(morgan('dev'));
}

//Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from the this IP, please try again in an hour!',
}); //Means we allow 100 request from the same IP in one hour, then we will get back un error massage

app.use('/api', limiter); //With this we limit the access to our API route, so we apply this limiter to /api, by that we effect all the routes that start by /api.

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //limit the body amount of data

//Data sanitization against NOSQL query injection
app.use(mongoSanitize()); //This middleware look at the request body, the request query string, and also at Request.Params, and then it will filter out all the dollar signs and dots, by removing this, those operators nologer gonna work

//Data santization against xss
app.use(xss()); //This will clean any user input from malicious HTML code

//Prevent the parameter polution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Salim',
  }); //it will intothe views folder and then get the template with the name  base fromit, all this becauseofthePUG engine, inorder to pass some data inthe template, allwe need is to define an object with variables called locals in the pug file
}); //we always use get to render page in the browser, with (/) the root of the website
//In order to connect these two route with the app, we call this mounting a new router in the route
app.use('/api/v1/tours', tourRouter);
//o route with the app, we call this mounting a new router in the route
app.use('/api/v1/users', userRouter);

app.use('/api/v1/reviews', reviewRouter); //Mounting the router with the path '/api/v1/reviews' and the middleware reviewRouter

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //when we pass an argument to the next(), exress will undrestand that htis an error so the application will go dirct to the global error handler
}); //all means for all http methode(get,  post...)

app.use(globalErrorHandler); //Global Error handler middleware

module.exports = app;
