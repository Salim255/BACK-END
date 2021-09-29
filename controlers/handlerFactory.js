const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Model couldbe tour or review...
exports.deleteOne = Model => catchAsync(async (req, res, next) => {
 
  const doc = await Model.findByIdAndDelete(req.params.id);
  
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  console.log('we are here\b:');
  res.status(204).json({
    //for delte we use 204, means no contaits
    status: 'success',
    data: null
    
  });
});
