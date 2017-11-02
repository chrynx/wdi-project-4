/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LoginForm from '../../../src/components/landingpage/LoginForm';

xdescribe('LoginForm tests', () => {
  it('should render two input fields and a button', done => {
    const props = {
      credentials: {
        email: 'test@test.com',
        password: 'password'
      },
      error: {}
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('input').length).to.equal(2);
    expect(wrapper.find('button').length).to.equal(1);
    done();
  });


  it('should correctly display errors', done => {
    const props = {
      credentials: {
        email: '',
        password: ''
      },
      error: 'Invalid credentials'
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('small.has-error').length).to.equal(1);
    done();
  });
});
