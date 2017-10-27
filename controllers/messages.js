const Message = require('../models/message');
const User = require('../models/user');

function messagesInbox(req, res) {
  Message
    .find({ receiver: req.currentUser })
    .populate('sender receiver')
    .exec()
    .then(receivedMessages => res.render('messages/inbox', {receivedMessages}))
    .catch(err => res.render('error', {err}));
}

function messagesSent(req, res) {
  Message
    .find({ sender: req.currentUser })
    .populate('sender receiver')
    .exec()
    .then(sentMessages => res.render('messages/sent', {sentMessages}))
    .catch(err => res.render('error', {err}));
}

function messagesNew (req, res) {
  User
    .find()
    .exec()
    .then(users => {
      users.sort(function(a, b){
        if(a.username < b.username) return -1;
        if(a.username > b.username) return 1;
        return 0;
      });
      res.render('messages/new', {users});
    })
    .catch(err => res.render('error', {err}));

}

function messagesCreate (req, res) {
  req.body.sender = req.currentUser;
  Message
    .create(req.body)
    .then(() => {
      req.flash('success', 'Message sent');
      res.redirect('/messages/sent');
    })
    .catch(err => res.render('error', {err}));
}

function messagesDelete (req, res) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => {
      return message.remove();
    })
    .then( () => {
      req.flash('success', 'Message deleted');
      res.redirect('/messages/inbox');
    })
    .catch((err) => res.render('error', {err}));
}

module.exports = {
  inbox: messagesInbox,
  sent: messagesSent,
  new: messagesNew,
  create: messagesCreate,
  delete: messagesDelete
};
