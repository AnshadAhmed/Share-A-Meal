const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
      },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  paymentMethod: {
    type: String,
    enum: ["cod", "upi"],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Confirmed", "Collected", "Cancelled"],
    default: "Confirmed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
