const mongoose = require('mongoose'); //To allow our Node code to access and interact with the a mongoDB database
const slugify = require('slugify');
//const validator = require('validator');
//to creat the schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //will remove all the white space in the begining and the end of the string
      required: [true, 'A tour must have a name'], //we call this validater
      unique: true,
      maxlength: [40, 'A tour name must have less or equal than  40 caracters'],
      minlength: [
        10,
        'A tour name must have more or equal than  10 characters',
      ],
      //validate: [validator.isAlpha, 'Tour name must only contain charaters'], //its a fucntion to call ..,
    },
    slug: String,

    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        //enum is only for strings
        values: ['easy', 'medium', 'difficult'], //here we pass the values that are allowed
        message: 'Difficulty is either:  easy or medium or  difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        //his only point to the current doc in new document creation, but not with update
        validator: function (discountValue) {
          return discountValue < this.price; //we trigger validation error when the return is false
        },
        message: 'Discount price({VALUE}) should be below to the regular price', //VALUE have access to the realy value
      },
    },
    summary: {
      type: String,
      trim: true, //will remove all the white space in the begining and the end of the string
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //to do not show the date of the creation
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      //
      //we use GeoJson in order to specify geospecial data with mongoDB,
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates:[Number],
        address:String,
        description:String,
        day:Number
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

//Document middleware: runs before  only .save() and .create() but not .insertMany()
tourSchema.pre('save', function (next) {
  //every pre middleware have acces to next

  this.slug = slugify(this.name, { lower: true }); //console.log(this);//This point to the currently proccess document, so here we have access to the document that gonna be saved, so we can make any change befre to be saved or create
  next();
}); //Pre means it gonna run before the actuel event('save') in this case

// tourSchema.pre('save', function(next){
//     console.log('Will save document...');
//     next();
// });//we can have mutiple pr or post middlewar  for the same Hook(means save or creat), we can cn say pre save Hook or pre save middleware

// tourSchema.post('save', function(doc,next){
//     console.log(doc);//doc is the finish document
//     next();
// }); //With post we have access to the document that has just saved to the database, and post excuted after all pre middlewar have completed

//Query Middlewar, pre will run before the command find excuted
//tourSchema.pre('find', function (next)
tourSchema.pre(/^find/, function (next) {
  ///^find/ means all the expression that start by find
  //and the this Keyword herewill point to the current query object and not th document
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query has took  ${Date.now() - this.start} milliseconds !`);
  //console.log(docs);
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); //we use unshift to add to the bigigning of an array
  console.log(this.pipeline()); //this point to the current aggrigation object
  next();
});
//to creat the model using the schema
const Tour = mongoose.model('Tour', tourSchema); //we alq¡ways use uppercase in model name and variables

module.exports = Tour;
