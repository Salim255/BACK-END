const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Dublicate field value: ${value}. Please use another value `;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message); //in order to lood in object we use object.values will give us a list of object  and map() to work throuht the list f object

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () =>
  new AppError('Invalid token. Please log in again!', '401');
const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again!', 401);

const sendErrorDev = (err, req, res) => {
  ///A)API
  //origialUrl is basically the entier url, but not the host
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  ///B)RENDERD WEBSITE
  console.error('Error', err);
  return res.status(err.statusCode).render('error', {
    title: 'Somthing went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    //A) //Operational eror : send the mesage to the client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //B)Programming error or other unknown error: dont leak error details
    //1)Log error
    console.error('Error', err); //just like conole.log()but its specfic for errors
    //2)Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Somthing went very wrong',
    });
  }
  //B)Rendered WEBSITE
  //Operational eror : send the mesage to the client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Somthing went wrong!',
      msg: err.message,
    });
  }
  //B)Programming error or other unknown error: dont leak error details
  //1)Log error
  console.error('Error', err); //just like conole.log()but its specfic for errors
  //2)Send generic message
  ///RENDERD WEBSITE
  return res.status(err.statusCode).render('error', {
    title: 'Somthing went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack); //will show us where the error happend
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (err.name === 'ValidationError') error = handleValidationErrorDB();

    if (err.name === 'JsonWebTokenError')
      error = handleJsonWebTokenError(error);

    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
