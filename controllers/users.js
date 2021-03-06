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
    .populate('requests')
    .exec()
    .then(user => res.json(user))
    .catch(err => res.render('error', {err}));
}

function usersUpdate (req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body);
      user.save();
      res.send(user);
    })
    .catch(next);
}
function usersDelete(req,res,next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}
function usersUpdatePassword (req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save();
    })
    .catch(next);
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
  update: usersUpdate,
  delete: usersDelete,
  updatePassword: usersUpdatePassword,
  // ---------------------------------------------------------
  // EMAIL VALIDATION
  checkEmail: usersCheckEmail,
  checkUsername: usersCheckUsername
  // ---------------------------------------------------------
};
