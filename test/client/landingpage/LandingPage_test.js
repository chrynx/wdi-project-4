/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import LandingPage from '../../../src/components/landingpage/LandingPage';
import { MemoryRouter } from 'react-router-dom';

xdescribe('LandingPage tests', () => {

  it('should render three section two divs and two buttons', done => {
    const wrapper = mount(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    console.log(wrapper);
    expect(wrapper.find('section').length).to.equal(1);
    expect(wrapper.find('div').length).to.equal(18);
    expect(wrapper.find('button').length).to.equal(4);
    done();
  });
});
