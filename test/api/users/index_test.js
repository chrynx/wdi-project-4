/* global api, describe, it, expect, beforeEach, afterEach */
require('../helper');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
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
  age: 0,
  gender: 'male',
  preferredGender: 'female',
  username: 'test2',
  email: 'test2@test.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

describe('GET /api/users', () => {
  let token = null;
  beforeEach(done => {
    User.create(userData, (err, users) => {
      token = jwt.sign({ userId: users[0].id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });
  afterEach(done => {
    User.remove(done);
  });

  it('should return a 401 response', done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect(401, done);
  });
  it('should return a 200 response', done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const user = res.body[0];
        expect(user.id).to.be.a('string');
        expect(user.firstname).to.equal(userData[0].firstname);
        expect(user.lastname).to.equal(userData[0].lastname);
        expect(user.age).to.equal(userData[0].age);
        expect(user.gender).to.equal(userData[0].gender);
        expect(user.preferredGender).to.equal(userData[0].preferredGender);
        expect(user.username).to.equal(userData[0].username);
        expect(user.email).to.equal(userData[0].email);
        done();
      });
  });
});
