require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./model/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3006;

db.connect();

app.use(express.json());
app.use(cors());
app.use(express.static("my-upload"))

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is Running at: ${PORT}`);
});
