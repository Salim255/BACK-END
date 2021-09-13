const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create un error if the user try to update the password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use/updateMyPasswod',
        400
      )
    );
  }
  //2)Filterd out unwanted fields name that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  //3)Udate user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  }); //new: true, to return a new object

  res.status(200).json({
    status: 'Success',
    data: {
      user: updatedUser,
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
