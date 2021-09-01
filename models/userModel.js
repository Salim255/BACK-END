const mongoose = require('mongoose');
const validator = require('validator');//Its a validator coming from npm
const bcrypt = require('bcryptjs');
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
      required:[true, 'Please confirm your password'],
      validate:{
        //This only work on CREATE and SAVE
        validator: function(el){
          return el === this.password;//remember This only work in save()!!
        },
        message: 'The password are not the same!'
      }
    },
  }
);

/************************ ENCRYPTING THE PASSWORD***********************/
//W'll use mongoose middleware, and the one that we gonna use is a pre-save middleware
userSchema.pre('save',async function(next){//we need NEXT in order to call the next middleware

  //Only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    /****we need to install bcryptjs package in order to use encrypting: npm i bcryptjs *******/

    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);//using hash to ecncrypt the password
    
    //Delete the passwordConfirm field
    this.passwordConfirm = undefined;

    next();
});//pre mean between geting the data and saving the data to the database

//Creating the model out of our schema
const User = mongoose.model('User', userSchema);

module.exports = User;
