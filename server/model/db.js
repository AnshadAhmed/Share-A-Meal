const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/ShareAMeal";

const connect = () => {
    mongoose.connect(uri)
        .then(() => { console.log(`connected to database ${uri} `) })
        .catch((e) => { console.log(e); })
}

module.exports = { connect };
