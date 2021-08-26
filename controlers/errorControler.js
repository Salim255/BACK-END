module.exports = (err, req, res, next) => {
  //console.log(err.stack); //will show us where the error happend
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
