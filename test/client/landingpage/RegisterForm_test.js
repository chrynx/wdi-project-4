/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RegisterForm from '../../../src/components/landingpage/RegisterForm';

xdescribe('RegisterForm tests', () => {
  it('should render seven input fields, two selects, and a button', done => {
    const props = {
      user: {
        firstname: 'test',
        lastname: 'test',
        age: 0,
        gender: 'male',
        preferredGender: 'female',
        username: 'chrynx',
        email: 'a@gmail.com',
        password: 'password',
        passwordConfirmation: 'password'
      },
      errors: {}
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('input').length).to.equal(7);
    expect(wrapper.find('select').length).to.equal(2);
    expect(wrapper.find('button').length).to.equal(1);
    done();
  });


  it('should correctly display errors', done => {
    const props = {
      user: {
        firstname: '',
        lastname: '',
        age: 'test',
        gender: '',
        preferredGender: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {
        firstname: 'First Name is required',
        lastname: 'Last Name is required',
        age: 'Age is required',
        gender: 'Gender is required',
        preferredGender: 'Preferred Gender is required',
        email: 'Email is required',
        password: 'password is required',
        passwordConfirmation: 'passwordConfirmation is required'
      }
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('small.has-error').length).to.equal(8);
    done();
  });
});
