const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    pwd: String,
    resetToken: String,
    resetTokenExpiry: Date,
    location:String,
    fullname: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profilePicture: String,
    createdAt: { type: Date, default: Date.now },
    cart: [{
        type: {
            mealId: String,
            name: String,
            price: Number,
            image: String,
            inquantity: String,
            prdiscription: String,
            quantity: { type: Number, default: 1 }
        }
    }]
});

module.exports = mongoose.model('User', userSchema);