const { Schema, model } = require('mongoose');

const messagesSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = model('Message', messagesSchema);

module.exports = Message;
