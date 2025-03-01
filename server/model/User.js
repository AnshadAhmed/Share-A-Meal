const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    pwd: String,
    fullname: String,
    phone: String,
    location: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);