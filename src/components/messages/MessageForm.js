import React from 'react';
import '../../scss/components/misc/MessageForm.scss';

const MessageForm = ({ handleChange, handleSubmit, message, style, friend, close }) => {
  return (
    <div  className="MessageForm" style={{ visibility: style }}>
      <form onSubmit={(e) => handleSubmit(e, friend)}>
        <input
          onChange={handleChange}
          type="text"
          name="subject"
          value={message.subject}
          placeholder="Enter message subject here..."
        />
        <input
          onChange={handleChange}
          type="textarea"
          name="text"
          value={message.text}
          placeholder="Type your message here..."
        />
        <button>Send Message</button>
      </form>
      <button className="formButton" onClick={close}>Cancel</button>
    </div>
  );

};

export default MessageForm;
