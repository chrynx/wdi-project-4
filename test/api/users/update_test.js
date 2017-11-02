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

const newUser = {
  firstname: 'newuser',
  lastname: 'newuser',
  age: 0,
  gender: 'male',
  preferredGender: 'female',
  username: 'newuser',
  email: 'newuser@test.com',
  password: 'password',
  passwordConfirmation: 'password'
};

describe('PUT /api/users/:id', () => {
  let user = {}; // this is users[0]
  let token = null;
  beforeEach(done => {
    User.create(userData, (err, users) => {
      user = users[0];
      token = jwt.sign({ userId: users[0].id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });

  afterEach(done => {
    User.remove(done);
  });

  it('should return a 401 response without a token', done => {
    api
      .put(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(401, done);
  });

  it('should return a 200 response', done => {
    api
      .put(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .put(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .put(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .end((err, res) => {
        const updatedUser = res.body;
        expect(updatedUser.id).to.be.a('string');
        expect(updatedUser.firstname).to.equal(newUser.firstname);
        expect(updatedUser.lastname).to.equal(newUser.lastname);
        expect(updatedUser.age).to.equal(newUser.age);
        expect(updatedUser.gender).to.equal(newUser.gender);
        expect(updatedUser.preferredGender).to.equal(newUser.preferredGender);
        expect(updatedUser.username).to.equal(newUser.username);
        expect(updatedUser.email).to.equal(newUser.email);
        done();
      });
  });
});
