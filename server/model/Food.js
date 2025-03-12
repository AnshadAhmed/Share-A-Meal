const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: String,
    quantity: String,
    phone: String,
    address: String,
    discription:String,
    picture: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Food', foodSchema);