/* global api, describe, it, expect, before, after, afterEach */

require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
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
const messageData = [{
  subject: 'subject-test',
  text: 'text-test'
}];

describe('POST /api/messages', () => {
  let token = null;

  before(done => {
    User.create(userData, (err, users) => {
      const sender = users[0].toJSON();
      sender._id = sender._id.toString();
      const receiver = users[1].toJSON();
      receiver._id = receiver._id.toString();
      messageData[0].sender = sender;
      messageData[0].receiver = receiver;
      token = jwt.sign({ userId: users[0].id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });

  after(done => {
    User.remove(done);
  });

  afterEach(done => {
    Message.remove(done);
  });

  it('should return a 401 response', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .send(messageData[0])
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(messageData[0])
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(messageData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/messages')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(messageData[0])
      .end((err, res) => {
        const message = res.body;
        expect(message.id).to.be.a('string');
        expect(message.subject).equal(messageData[0].subject);
        expect(message.text).to.equal(messageData[0].text);
        expect(message.sender.firstname).to.equal(messageData[0].sender.firstname);
        expect(message.receiver.firstname).to.equal(messageData[0].receiver.firstname);
        expect(message.sender.lastname).to.equal(messageData[0].sender.lastname);
        expect(message.receiver.lastname).to.equal(messageData[0].receiver.lastname);
        done();
      });
  });
});
