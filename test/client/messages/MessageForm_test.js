/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import MessageForm from '../../../src/components/messages/MessageForm';

describe('MessageForm tests', () => {
  it('should render two input fields', done => {
    const props = {
      message: {
        subject: 'test subject',
        text: 'test text',
        sender: 'asdfas.asdfasdf.asdfsadf',
        receiver: '23qwef3wef.9q34utwf9h34f.0q48rq374tfiueh'
      },
      errors: {}
    };

    const wrapper = shallow(<MessageForm {...props} />);
    expect(wrapper.find('input').length).to.equal(1);
    expect(wrapper.find('textarea').length).to.equal(1);
    done();
  });

  it('should correctly display errors', done => {
    const props = {
      message: {
        subject: '',
        text: '',
        sender: '',
        receiver: ''
      },
      errors: {
        subject: 'The subject is required',
        text: 'The text is required',
        sender: 'A sender is required',
        receiver: 'A receiver is required'
      }
    };

    const wrapper = shallow(<MessageForm {...props} />);
    expect(wrapper.find('div.form-group.has-error').length).to.equal(2);
    expect(wrapper.find('small.has-error').length).to.equal(2);
    done();
  });
});
