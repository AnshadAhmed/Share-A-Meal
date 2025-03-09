const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    pwd: String,
    resetToken: String,
    resetTokenExpiry: Date,
    fullname: String,
    phone: String,
    location: String,
    profilePicture: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);