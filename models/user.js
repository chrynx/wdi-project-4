const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstname: { type: String, writable: true, required: 'Your first name is required' },
  lastname: { type: String, writable: true, required: 'Your last name is required' },
  age: {type: Number, writable: true, required: 'Your age is required' },
  gender: {type: String, writable: true, required: 'Your gender is required'},
  preferredGender: { type: String, writable: true, required: 'Your preferred gender is required'},
  username: { type: String, writable: true, unique: 'Username has already been taken', required: 'A username is required' },
  image: { type: String, writable: true, required: 'An image is required' },
  email: { type: String, writable: true, unique: 'Email has already been taken', required: 'An e-mail address is required' },
  password: { type: String, writable: true, required: 'A password is required' },
  requests: [{type: String}],
  matches: [{type: String}]
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPassWordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordConfirmation(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password)
    this.invalidate('passwordConfirmation', 'Your passwords do not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
