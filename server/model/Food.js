const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    mealname: String,
    price: String,
    discription: String,
    category: String,
    location: String,
    pickupAddress: String,
    quantity: String,
    photo: String,
    option: String,
    user_id:String,
    status: {type: String,enum: ["Available", "Sold-Out"],default: "Available"},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure this reference exists
    createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('Food', foodSchema);