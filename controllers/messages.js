const Message = require('../models/message');

function all(req, res, next) {
  Message
    .find()
    .populate( 'sender receiver' )
    .exec()
    .then(messages => res.json(messages))
    .catch(next);
}

function create (req, res, next) {
  Message
    .create(req.body)
    .then(message => {
      return Message
        .populate(message, { path: 'sender receiver' });
    })
    .then(message => {
      res.status(201).json(message);
    })
    .catch(next);
}

function destroy (req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => message.remove())
    .catch(next);
}

module.exports = {
  all,
  create,
  destroy
};
