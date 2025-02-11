const mongoose=require('mongoose')

const userScema=mongoose.Schema({
    username:String,
    email:String,
    pwd:String,
    createdAt: { type: Date, default: Date.now }

})

module.exports=mongoose.model('User',userScema)