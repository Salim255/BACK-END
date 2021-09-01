const mongoose = require('mongoose');
const validator = require('validator');//Its a validator coming from npm
//1) create userSchema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required:[true, 'Please provide your email'],
      unique:true,
      lowercase: true,
      validate:[validator.isEmail, 'Please provide a valid email']
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required:[true, 'Please provide a password'],
      minlength:8
    },
    passwordConfirm: {
      type: String,
      required:[true, 'Please confirm your password']
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Creating the model out of our schema
const User = mongoose.model('User', userSchema);

module.exports = User;