const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
 
  const value = err.keyValue.name;

  const message = `Dublicate field value: ${value}. Please use another value `; //juste google reguler expression match text between quotes

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational eror : send the mesage to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming error or other unknown error: dont leak error details
  } else {
    //1)Log error
    console.error('Error', err); //just like conole.log()but its specfic for errors

    //2)Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Somthing went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack); //will show us where the error happend
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    console.log('DOSHKA: ', error)
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    sendErrorProd(error, res);
  }
};
