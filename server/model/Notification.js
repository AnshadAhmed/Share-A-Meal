const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    title: String,
    message: String,
    read: { type: Boolean, default: false },
    status: String,
    createdAt: { type: Date, default: Date.now },
})


module.exports = mongoose.model('Notification', notificationSchema);
