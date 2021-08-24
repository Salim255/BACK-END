const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
  next();
};

// //***************************** */
//mongoose will take care of this
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing Nameor Price',
//     });
//   }
//   next();
// };

//we JSON to onvert to java script
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    //Build a Query
    // //1A) Filtring
    // const queryObj = { ...req.query };
    // const excludeField = ['page', 'sort', 'limit', 'fields'];
    // excludeField.forEach((el) => delete queryObj[el]);
    // //console.log(req.query, queryObj);

    // //1B) Advance filtring
    // let queryStr = JSON.stringify(queryObj); //To convertthe object into string

    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //\b \b means exat string, g means if there are more than one occurance
    // console.log(JSON.parse(queryStr));

    // let query = Tour.find(JSON.parse(queryStr));
    // //Method ONE
    // //  //This will send  a promise so will use async

    //2)SORTING
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy);
    //   query = query.sort(req.query.sort); //to sort fromupto down we use sort=-price
    //   //sort('price raingsAverage ...')
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // //3)Field limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields /*'name, duration, price'*/);
    // } else {
    //   query = query.select('-__v');
    // }

    // //4) PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // console.log(page, limit, skip);
    // //page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
    // query = query.skip(skip).limit(limit); //skip mean to to jumb 10 by 10

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) {
    //     throw new Error('This page does not exist');
    //   }
    // }
    //Execute Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    //const tours = await query;
    //query.sort().select().skip().limit()

    //const query =  Tour.find().where("duration").equals(5).where("difficulty").equals('easy'); //Method two, mongoose methode
    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      resultes: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
//Using get to read data

//geting variable, the variable can be var id or anything
exports.getTour = async (req, res) => {
  try {
    // console.log(req.params.id); //params is whrer all the variables thhat define in the route are store, her wil be the id
    const id = req.params.id; //when mutiply string with *1 we convert it to int;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

//Using Post to creat
// exports.creatTour = (req, res) => {

exports.creatTour = async (req, res) => {
  try {
    //methode 1
    // const newTour = new Tour({});
    // newTour.save(;)
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

//to update params of un object we use patch

exports.updatTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

//To delete un object form an API

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      //for delte we use 204, means no contaits
      status: 'success',
      data: {
        tour: null,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

//AGGREGATION PIPELINE
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          // _id: '$ratingsAverage',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, //+1 from down to up and -1 from up to down
      },
      // {
      //   $match:{_id:{$ne: 'EASY'}}
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' }, //We are grouping them by the month
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }, //to creat an array we use push
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0, //to show or notthe id by using (0 or 1)
        },
      },
      {
        $sort: {
          numTourStarts: -1, //we can use 1 or -1 to sort them -1 start with the highest
        },
      },
      {
        $limit: 12,
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        plan: plan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
