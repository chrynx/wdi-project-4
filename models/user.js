const s3 = require('../lib/s3');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const friendsPlugin = require('mongoose-friends-plugin');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: 'Your first name is required' },
  lastname: { type: String, required: 'Your last name is required' },
  age: {type: Number, required: 'Your age is required' },
  gender: {type: String, required: 'Your gender is required'},
  preferredGender: { type: String, required: 'Your preferred gender is required'},
  username: { type: String, unique: 'Username has already been taken', required: 'A username is required' },
  image: { type: String },
  email: { type: String, unique: 'Email has already been taken', required: 'An e-mail address is required' },
  password: { type: String, required: 'A password is required' }
});
userSchema.plugin(friendsPlugin({ pathName: 'matches' }));
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

// ------------------ image -----------------------
userSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

userSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

userSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) {
    return s3.deleteObject({ Key: this.image }, next);
  }
  next();
});
// -----------------------------------------

module.exports = mongoose.model('User', userSchema);
