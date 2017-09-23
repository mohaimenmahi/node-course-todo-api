const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () { // only email and id will be visible. using _.pick()
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () { // encrypting and setting up tokens
  var user = this; // instance method, for general
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  })
};

// private routs and auth middlewares (middleware: like glue between os and ui)
// statics is an object kind of like methods, everything we add on to it turns into a model method as a instance method
// statics is not an instance, for individuals
UserSchema.statics.findByToken = function (token) {
  var User = this; // uppercase U for model method
  var decoded; // undefined

  // reason of undefined decoded variable
  // jwt.verify() is gonna through an error if anything goes wrong
  // if the secret doesnt match the secret of the token is created with of if the token value is manipulated
  // we wanna catch this error and do something with it
  // to do it, we gonna use try catch block
  try { // if any error happens into try block, code is gonna stop execution in the try block and moves into catch block
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
      return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User',UserSchema);

module.exports = {User};

// var newUser = new User({
//   name: 'Mohaimen Chowdhury Mahi',
//   email: '*****@gmail.com'
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save user data', e);
// });
