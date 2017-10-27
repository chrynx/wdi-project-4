const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}
function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      console.log(user);
      res.render('users/profile', { user, test: 'Hello' });
    })
    .catch(err => res.render('error', {err}));
}
function usersEdit (req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      res.render('users/edit', {user});
    })
    .catch(err => res.render('error', {err}));
}

function usersUpdate (req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(user => {
      req.flash('success', 'Profile edited');
      res.redirect(`${user.id}`);
    })
    .catch(err => res.render('error', { err }));
}

function usersEditPassword (req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      res.render('users/password', {user});
    })
    .catch(err => res.render('error', {err}));
}
function usersUpdatePassword (req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then((user) => {
      req.flash('success', 'Your password has been changed');
      res.redirect(`/users/${user.id}`);
    })
    .catch(err => res.render('error', {err}));
}


// ---------------------------------------------------------
// EMAIL VALIDATION
// ---------------------------------------------------------
function usersCheckEmail(req, res) {
  if(!req.query.email) return res.json(true);
  User
    .findOne({email: req.query.email })
    .exec()
    .then(user => res.json(!user));
}
function usersCheckUsername(req, res) {
  if(!req.query.username) return res.json(true);
  User
    .findOne({username: req.query.username })
    .exec()
    .then(user => res.json(!user));
}
// -----------------------------------------------------------
// -----------------------------------------------------------
module.exports = {
  index: usersIndex,
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate,
  editPassword: usersEditPassword,
  updatePassword: usersUpdatePassword,
  // ---------------------------------------------------------
  // EMAIL VALIDATION
  checkEmail: usersCheckEmail,
  checkUsername: usersCheckUsername
  // ---------------------------------------------------------
};
