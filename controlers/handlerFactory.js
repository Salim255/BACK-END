const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

//Model couldbe tour or review...

exports.getAll = Model =>  catchAsync(async (req, res, next) => {
  

  //To allow for nested GET reviews on tour (hack)
  let filter = {};
  //We use this to filter the reviews by tour id
  if(req.params.tourId) filter = {tour: req.params.tourId};
  

  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    resultes: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const newDoc = await Model.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});

exports.updateOne = Model =>catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    },
  });
});

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

exports.getOne  = (Model, popOptions) => catchAsync(async (req, res, next) => {

  const id = req.params.id;

  //W'll first create the query and then if there is the populate options object, w'll then add that to the query, and then by the end, await that query 
  let query = Model.findById(id);

  if(popOptions) query = query.populate(popOptions);

  //const doc = await Model.findById(id).populate('reviews');
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

