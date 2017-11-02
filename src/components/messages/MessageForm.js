import React from 'react';
import '../../scss/components/misc/MessageForm.scss';

const MessageForm = ({ handleChange, handleSubmit, message, style, friend, close, errors }) => {
  return (
    <div  className="MessageForm" style={{ visibility: style }}>
      <form onSubmit={(e) => handleSubmit(e, friend)}>
        <div className={ errors.subject ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="subject">Message Subject</label>
          <input
            onChange={handleChange}
            type="text"
            name="subject"
            value={message.subject}
            placeholder="Enter message subject here..."
          />
          {errors.subject && <small className="has-error">{errors.subject}</small>}
        </div>
        <div className={ errors.text ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="text"> Message Content</label>
          <textarea
            onChange={handleChange}
            type="text"
            name="text"
            value={message.text}
            placeholder="Type your message here..."
          />
          {errors.text && <small className="has-error">{errors.text}</small>}
        </div>
        <button>Send Message</button>
      </form>
      <button className="formButton" onClick={close}>Cancel</button>
    </div>
  );

};

export default MessageForm;
