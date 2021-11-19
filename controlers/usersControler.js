const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};



exports.getMe = (req, res,  next) =>{
  req.params.id = req.user.id;
  next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
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

exports.deleteMe = catchAsync(async (req, res, next) =>{
  await User.findByIdAndUpdate(req.user.id, {active:false});

  res.status(204).json({
    status:'Success',
    data: null
  });//204 for deleted
})




exports.createUser = (req, res) => {
  res.status(500).json({
    //500 means internal srever error
    status: 'error',
    message: 'This route is not yet defined! Please use /signup instead',
  });
};



exports.getAllUsers = factory.getAll(User);//Users route handelers
exports.getUser =factory.getOne(User);
exports.updateUser =factory.updateOne(User);//Dont update the pasword by this 
exports.deleteUser =factory.deleteOne(User);
