const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const csp = "default-src 'self' https://js.stripe.com/v3/ https://cdnjs.cloudflare.com https://api.mapbox.com; base-uri 'self'; block-all-mixed-content; connect-src 'self' https://js.stripe.com/v3/ https://cdnjs.cloudflare.com/ https://*.mapbox.com/; font-src 'self' https://fonts.google.com/ https: data:;frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self' https://js.stripe.com/v3/ https://cdnjs.cloudflare.com/ https://api.mapbox.com/ blob:; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests;";
 

 


exports.getOverview = catchAsync(async (req, res) => {
  //1) Get the tour data from collection
  const tours = await Tour.find();
  //2) Build template
  //3) Render that template using tour data from 1)
  res.status(200).set('Content-Security-Policy', csp).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  //1) get the data, for the requested tour(including reviews andguides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user', //only field that we need
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  //2) Building the template

  //3)Render template using data from 1
  res
    .status(200).
    set('Content-Security-Policy', csp)
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});


exports.getLoginForm = (req, res) => {
  res
    .status(200).
    set('Content-Security-Policy', csp)
    .render('login', {
      title: 'Log into your account',
    });
};

exports.getAccount = (req, res) =>{
  res
    .status(200).set('Content-Security-Policy', csp)
    .render('account', {
      title: 'Your account',
    });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email
  },{
    new: true,//means we want to get the new data
    runValidators: true
  });

  res.status(200).set('Content-Security-Policy', csp).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});