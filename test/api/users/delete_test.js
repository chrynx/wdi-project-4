/* global describe, it, expect,  beforeEach, afterEach, api */
require('../helper');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const User = require('../../../models/user');

describe('DELETE /api/users/:id', () => {

  let token = null;
  let userOne = null;

  beforeEach(done => {
    User.create({
      firstname: 'tokenPerson',
      lastname: 'tokenPerson',
      age: 0,
      gender: 'male',
      preferredGender: 'female',
      matches: [],
      username: 'tokenPerson',
      email: 'tokenPerson@tokenPerson.com',
      password: 'password',
      passwordConfirmation: 'password'
    }, (err, user) => {
      token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      userOne = user;
      done(err);
    });
  });

  afterEach(done => {
    User.remove(done);
  });

  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/users/${userOne.id}`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/users/${userOne.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });

  it('should actually delete the record', done => {
    api
      .delete(`/api/users/${userOne.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        User.findById(userOne.id, (err, user) => {
          expect(user).to.be.null;
          done();
        });
      });
  });

});
