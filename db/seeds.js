const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = require('../models/user');
const { dbURI } = require('../config/environment');// ==================================POSTS==============================================

const userData = [{
  firstname: 'testFirst',
  lastname: 'testLast',
  age: 18,
  gender: 'male',
  preferredGender: 'female',
  username: 'test',
  email: 'test@test.com',
  password: 'password',
  passwordConfirmation: 'password',
  image: 'http://placecage.com/500/500'
}, {
  firstname: 'test2First',
  lastname: 'test2Last',
  age: 18,
  gender: 'male',
  preferredGender: 'female',
  username: 'test2',
  email: 'test2@test.com',
  password: 'password',
  passwordConfirmation: 'password',
  image: 'http://placecage.com/400/400'
}];


mongoose
  .connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => console.log(users.length + ' users created!'))
  .catch(err => console.log(err))
  .finally(() => {
    mongoose.connection.close();
  });
