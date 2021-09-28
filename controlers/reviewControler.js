const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllReviews = catchAsync(async (req, res, next) => {
  
  const reviews = await Review.find();

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    resultes: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});


exports.createReview = catchAsync(async (req, res, next) => {
  //Allow nested routes
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;
  
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      Review: newReview,
    },
  });
});