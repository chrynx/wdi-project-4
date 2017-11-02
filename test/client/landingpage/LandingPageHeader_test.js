/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LandingPageHeader from '../../../src/components/landingpage/LandingPageHeader';

xdescribe('LandingPageHeader tests', () => {
  it('should render four <p> inside one <section>', done => {
    const wrapper = shallow(<LandingPageHeader  />);
    console.log(wrapper);
    expect(wrapper.find('p').length).to.equal(4);
    expect(wrapper.find('section').length).to.equal(1);
    done();
  });

});
