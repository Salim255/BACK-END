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
  }else{
    //1)Log error
    console.error('Error', err);//just like conole.log()but its specfic for errors

    //2)Send generic message
    res.status(500).json({
      status:'error',
      message:'Somthing went very wrong'
    })
  }
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack); //will show us where the error happend
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'develpment') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
