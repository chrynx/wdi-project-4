const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  subject: { type: String, required: 'A subject is required' },
  text: { type: String, maxlength: 380, required: 'The content is required' },
  sender: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
  receiver: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Message', messageSchema);
