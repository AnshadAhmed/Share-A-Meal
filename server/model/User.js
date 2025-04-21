const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    pwd: String,
    resetToken: String,
    resetTokenExpiry: Date,
    location: String,
    phone: String,
    fullname: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['Active', 'Blocked'], default: 'Active' },
    profilePicture: String,
    createdAt: { type: Date, default: Date.now },
    cart: [{
        type: {
            MEALID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food"
            },
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








// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     username: String,
//     email: String,
//     pwd: String,
//     resetToken: String,
//     resetTokenExpiry: Date,
//     location:String,
//     phone:String,
//     fullname: String,
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
//     profilePicture: String,
//     createdAt: { type: Date, default: Date.now },
//     cart: [{
//         type: {
//             mealId: String,
//             name: String,
//             price: Number,
//             image: String,
//             inquantity: String,
//             prdiscription: String,
//             quantity: { type: Number, default: 1 }
//         }
//     }]
// });

// module.exports = mongoose.model('User', userSchema);