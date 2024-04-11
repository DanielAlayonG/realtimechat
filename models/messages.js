const { Schema, model } = require('mongoose');

const messagesSchema = new Schema({
    user: { type:String, required: true  },
    type: { type: String, required: true },
    timestamp: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = model('Message', messagesSchema);

module.exports = Message;
