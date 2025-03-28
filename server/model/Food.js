const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    mealname: String,
    price: String,
    discription: String,
    category: String,
    location: String,
    pickupAddress: String,
    quantity: { type: Number, min: 0, default: 0 },
    option: String,
    user_id: String,
    photo:String,
    status: { type: String, enum: ["Available", "Sold-Out"], default: "Available" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure this reference exists
    createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('Food', foodSchema);