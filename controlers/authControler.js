const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync'); //we wrappe all asynchronousfunction into this fucntion sothat we dont need to write the try catch block in each and evry fucntion

const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); //.sign(payload, ..)Payload is just an object for all the data.THIS ALL WE NEED TO LOGIN A NEW USER
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  }); //By doing this we only allow the data that we need to be entred by the user,(WE CONTROLING THE USERS INPUT)

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'Success',
    token,
    data: {
      user: newUser,
    },
  });
}); //We called signup in order to create a new user,beacuse signup has more mining in the context of authentication, than cratingUser() as we did with toursin tourControler

////Now all we need to do is to implement the route so that this signup handler here then get called. SO LETS GO TO THE userRoute...

//****LOGGIN USER IN */
exports.login = catchAsync(async (req, res, next) => {
  //const email =  req.body.email;
  const { email, password } = req.body;

  //1) Weneed to check if email and password exist
  if (!email || !password) {
    return next(new AppError('Plese provide email and password', 400));
  }

  //2)check if the user exist && password is correct
  const user = await User.findOne({ email }).select('+password'); //email:email, we '+password' to make it selceted
  //const correct = await user.correctPassword(password, user.password);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3)If everthing ok, send the token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

//****We create a middelware that check if the user is allowed to get access to the all tours */
exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting the token and check if its exist,
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } //reading  token from the header
  console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in!, Please log in to get access.', 401)
    );
  }
  //2)Verification token

  //3)Check if user still exists

  //4) Check if user changed password after the token was issued
  next();
});
