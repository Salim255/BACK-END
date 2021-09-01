const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync'); //we wrappe all asynchronousfunction into this fucntion sothat we dont need to write the try catch block in each and evry fucntion

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });//By doing this we only allow the data that we need to be entred by the user,(WE CONTROLING THE USERS INPUT)
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); //.sign(payload, ..)Payload is just an object for all the data.THIS ALL WE NEED TO LOGIN A NEW USER

  res.status(201).json({
    status: 'Success',
    token,
    data: {
      user: newUser,
    },
  });
}); //We called signup in order to create a new user,beacuse signup has more mining in the context of authentication, than cratingUser() as we did with toursin tourControler

////Now all we need to do is to implement the route so that this signup handler here then get called. SO LETS GO TO THE userRoute...
