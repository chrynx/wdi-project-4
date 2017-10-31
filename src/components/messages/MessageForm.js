import React from 'react';

const MessageForm = ({ handleChange, handleSubmit, message, style, sender, receiver }) => {
  return (
    <form style={{visibility: style }} onSubmit={handleSubmit}>
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
      <input
        onChange={handleChange}
        type="text"
        name="image"
        value={message.image}
        placeholder="Type URL for an image..."
      />
      <input
        style={{visibility: 'hidden'}}
        onChange={handleChange}
        type="text"
        name="sender"
        value={sender}
      />
      <input
        style={{visibility: 'hidden'}}
        onChange={handleChange}
        type="text"
        name="receiver"
        value={receiver}
      />
      <button>Send Message</button>
    </form>
  );

};

export default MessageForm;
