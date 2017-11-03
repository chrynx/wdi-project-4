const Message = require('../models/message');

function messagesIndex(req, res, next) {
  Message
    .find()
    .populate( 'sender receiver' )
    .exec()
    .then(messages => res.json(messages))
    .catch(next);
}

function messagesCreate (req, res, next) {
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

function messagesDelete (req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => message.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate,
  delete: messagesDelete
};
