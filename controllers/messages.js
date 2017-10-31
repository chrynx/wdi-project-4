const Message = require('../models/message');

function all(req, res, next) {
  Message
    .find()
    .exec()
    .then(messages => res.json(messages))
    .catch(next);
}

function create (req, res, next) {
  Message
    .create(req.body)
    .then(res => res.status(201).json(res))
    .catch(next);
}

function destroy (req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => message.remove())
    .then(res => res.status(204))
    .catch(next);
}

module.exports = {
  all,
  create,
  destroy
};
