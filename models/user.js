const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = model('User', userSchema);

module.exports = User;
