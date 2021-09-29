const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');


exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  //Weusethis tofilter the reviews by tour id
  if(req.params.tourId) filter = {tour: req.params.tourId};
  const reviews = await Review.find(filter);

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    resultes: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});

exports.setTourUserIds = (req, res, next)=>{
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;//we git this from protect middleware
  next();
}

exports.createReview = factory.createOne(Review);
  

exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);