const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    mealname: String,
    price:String,
    discription:String,
    category:String,
    location:String,
    pickupAddress:String,
    quantity:String,
    photo: String,
    option:String,
    user_id:String,
    createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('Food', foodSchema);