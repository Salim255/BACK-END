const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync'); //we wrappe all asynchronousfunction into this fucntion sothat we dont need to write the try catch block in each and evry fucntion

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      user: newUser,
    },
  });
}); //We called signup in order to create a new user,beacuse signup has more mining in the context of authentication, than cratingUser() as we did with toursin tourControler


////Now all we need to do is to implement the route so that this signup handler here then get called. SO LETS GO TO THE userRoute...