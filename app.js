const express = require('express');
//declaring morgan  middleware
const morgan = require('morgan');
//const { get } = require('http');

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
  console.log('Hello from midleware');
  next();
});

app.use((req, res, next) => {
  req.SalimTime = new Date().toISOString();

  next();
});

// app.get('/', (req, res) => {
//   // res.status(200).send('Hello from the server side');
//   res.status(200).json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res)=>{
//  res.send('you can post to this URL');
// })

//In order to connect these two route with the app, we call this mounting a new router in the route
app.use('/api/v1/tours', tourRouter);
//o route with the app, we call this mounting a new router in the route
app.use('/api/v1/users', userRouter);

module.exports = app;
