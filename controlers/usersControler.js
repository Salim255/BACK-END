const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

//Users route handelers
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    resultes: users.length,
    data: {
      users: users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    //500 means internal srever error
    status: 'error',
    message: 'This Route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    //500 means internal srever error
    status: 'error',
    message: 'This Route is not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    //500 means internal srever error
    status: 'error',
    message: 'This Route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    //500 means internal srever error
    status: 'error',
    message: 'This Route is not yet defined',
  });
};

//app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', creatTour);
// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updatTour);
// app.delete('/api/v1/tours/:id',deleteTour );
