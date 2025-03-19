require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./model/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3006;
app.use(cors());

app.use('/my-upload',express.static(path.join(__dirname,"my-upload")))
// app.use(express.static('/my-upload'))

db.connect();

app.use(express.json());



app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is Running at: ${PORT}`);
});


