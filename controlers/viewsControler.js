const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //1) Get the tour data from collection
  const tours = await Tour.find();
  //2) Build template
  //3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  //1) get the data, for the requested tour(including reviews andguides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user', //only field that we need
  });
  //2) Building the template
  console.log(tour);
  //3)Render template using data from 1
  res.status(200).render('tour', {
    title: 'The Forset Hiker Tour',
    tour,
  });
});
