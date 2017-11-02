/* global api, expect, describe, it, before, after */
require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const User = require('../../../models/user');

describe('GET /api/users/:id', () => {
  let user = {};
  let token = null;
  const userData = {
    firstname: 'test',
    lastname: 'test',
    age: 0,
    gender: 'male',
    preferredGender: 'female',
    matches: [],
    username: 'test',
    email: 'test@test.com',
    password: 'password',
    passwordConfirmation: 'password'
  };

  before(done => {
    User.create(userData, (err, users) => {
      user = users;
      token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });

  after(done => {
    User.remove(done);
  });

  it('should return a 401 response', done => {
    api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should return the correct data', done => {
    api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const responseUser = res.body;
        expect(responseUser.id).to.be.a('string');
        expect(responseUser.firstname).to.equal(userData.firstname);
        expect(responseUser.lastname).to.equal(userData.lastname);
        expect(responseUser.age).to.equal(userData.age);
        expect(responseUser.gender).to.equal(userData.gender);
        expect(responseUser.preferredGender).to.equal(userData.preferredGender);
        expect(responseUser.username).to.equal(userData.username);
        expect(responseUser.email).to.equal(userData.email);
        done();
      });
  });
});
