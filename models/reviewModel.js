const mongoose = require('mongoose');
//review /rating / creatdAt / ref to tour / ref to user

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review Can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    //Parents refercencing
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      requierd: [true, 'Review must belong to a tour.'],
    },
    //Parent refercencing
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong tp a user.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    //in query middleware we use this.---
    path: 'tour',
    select: 'name', //onley need tour name and nothing else
  }).populate({ path: 'user', select: 'name photo' }); //Poplate in order to fillup the field guides inside the tour, ThisPopulate is afondamuntal tools for working with datas in mongoose
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
