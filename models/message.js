const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  text: { type: String, maxlength: 380 },
  image: String,
  sender: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
  receiver: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Message', messageSchema);
