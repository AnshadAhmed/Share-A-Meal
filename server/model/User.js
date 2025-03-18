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
    createdAt: { type: Date, default: Date.now },
    cart: [{
        type: {
            mealId:String,
            quantity: { type: Number, default: 1 }
        }
    }]
});

module.exports = mongoose.model('User', userSchema);