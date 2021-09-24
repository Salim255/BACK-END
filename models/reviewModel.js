const mongoose = require('mongoose');
//review /rating / creatdAt / ref to tour / ref to user

const reviewShema = new mongoose.Schema(
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

const Review = mongoose.model('Review', reviewShema);

module.exports = Review;
