/* global api, describe, it, expect, before, after */
require('../helper');

const Message = require('../../../models/message');
const User = require('../../../models/user');
const userData = [{
  firstname: 'test',
  lastname: 'test',
  age: 0,
  gender: 'male',
  preferredGender: 'female',
  username: 'test',
  email: 'test@test.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  firstname: 'test2',
  lastname: 'test2',
  age: 1,
  gender: 'male',
  preferredGender: 'female',
  username: 'test2',
  email: 'test2@test.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

describe('GET /api/messages', () => {
  let messageData = [];
  before(done => {
    User
      .create(userData)
      .then(users => {
        messageData = [{
          subject: 'subject-test',
          text: 'text-test',
          sender: users[0],
          receiver: users[1]
        }, {
          subject: 'subject-test2',
          text: 'text-test2',
          sender: users[1],
          receiver: users[0]
        }];
        Message.create(messageData);
      });
    done();
  });

  after(done => {
    User.collection.remove();
    Message.collection.remove();
    done();
  });

  it('should return a 200 response', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array of correct length', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        done();
      });
  });
  it('should return the correct values', done => {
    api
      .get('/api/messages')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body[0].subject).to.equal(messageData[0].subject);
        expect(res.body[0].text).to.equal(messageData[0].text);
        expect(res.body[0].sender.id).to.equal(messageData[0].sender.id);
        expect(res.body[0].receiver.id).to.equal(messageData[0].receiver.id);
        done();
      });
  });
});
