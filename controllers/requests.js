const User = require('../models/user');


function getFriendships(req, res, next) {
  User
    .getFriends(req.params.id)
    .then(friendships => {
      console.log(friendships);
      res.json(friendships);
    })
    .catch(next);
}

function makeRequest(req, res, next) {
  User
    .requestFriend(req.body.userId, req.body.requestId)
    .then(res => console.log('RESSS', res))
    .catch(next);
}

module.exports = {
  get: getFriendships,
  request: makeRequest
};
