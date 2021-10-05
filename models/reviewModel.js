const mongoose = require('mongoose');
//review /rating / creatdAt / ref to tour / ref to user
const Tour = require('./tourModel');
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
  {
    //passing options, getting the virual properties to the document/object
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   //in query middleware we use this.---
  //   path: 'tour',
  //   select: 'name', //onley need tour name and nothing else
  // }).populate({ 
  //   path: 'user', 
  //   select: 'name photo' }); //Poplate in order to fillup the field guides inside the tour, ThisPopulate is afondamuntal tools for working with datas in mongoose

  this.populate({ 
    path: 'user', 
    select: 'name photo' }); //Poplate in order to fillup the field guides inside the tour, ThisPopulate is afondamuntal tools for working with datas in mongoose
  next();
});

////Static method in mongoose

reviewSchema.statics.calcAverageRatings  = async function(tourId){

  const stats = await this.aggregate([
     {
       $match: {tour: tourId}
     },
     {
       $group: {
       _id:'$tour',
       nRating: {$sum: 1},
       avgRating: {$avg: '$rating'}
     }
    }
   ]);//Instatic method like this, this keyword refare always to the current model

   console.log(stats);

   await Tour.findByIdAndUpdate(tourId, {
     ratingsAverage: stats[0].nRating,
     ratingsQuantity: stats[0].avgRating,
   })
};

reviewSchema.post('save', function(){
  //this point to the current review 
  this.constructor.calcAverageRatings(this.tour);//Tour represent the tourId that we specified the aggragation  ;//this point to the current document(review) and constructor point to the model that creat this documnt, in this case is the tourModel
 
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
