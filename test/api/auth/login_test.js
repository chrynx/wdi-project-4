/* global api, describe, it, expect, beforeEach, afterEach */
require('../helper');
const atob = require('atob');
const User = require('../../../models/user');

const userData = [{
  firstname: 'test',
  lastname: 'test',
  age: 24,
  gender: 'male',
  preferredGender: 'female',
  username: 'test',
  email: 'test@test.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

describe('POST /api/login', () => {
  let user = null;

  beforeEach(done => {
    User.create(userData, (err, users) => {
      user = users[0];
      done(err);
    });
  });

  afterEach(done => {
    User.collection.remove(done);
  });

  it('should return a 401 response with invalid credentials', done => {
    api
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ email: 'bad', password: 'bad' })
      .expect(401, done);
  });

  it('should return a 200 response', done => {
    api
      .post('/api/login')
      .set('Accept', 'application/json')
      .send(userData[0])
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .post('/api/login')
      .set('Accept', 'application/json')
      .send(userData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return a valid token', done => {
    api
      .post('/api/login')
      .set('Accept', 'application/json')
      .send(userData[0])
      .end((err,res) => {
        expect(res.body.token).to.be.a('string');
        const payload = JSON.parse(atob(res.body.token.split('.')[1]));
        expect(payload).to.be.an('object');
        expect(payload.userId).to.be.a('string');
        expect(payload.userId).to.equal(user.id);
        done();
      });
  });
});
