const mongoose = require('mongoose'); //To allow our Node code to access and interact with the a mongoDB database
const slugify = require('slugify');

//to creat the schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //will remove all the white space in the begining and the end of the string
      required: [true, 'A tour must have a name'], //we call this validater
      unique: true,
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
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
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
