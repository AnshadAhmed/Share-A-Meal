require('dotenv').config()
// import {useform} from 'react-hook-form'
const express = require('express')
const app = express()
const PORT = process.env.PORT
const bcrypt = require('bcryptjs')

const { body, validationResult } = require('express-validator');

const db = require('./model/db')
db.connect()

const User = require('./model/User')

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post("/login", [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('pwd').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, pwd } = req.body;
        const userdata = await User.findOne({ email: email });

        console.log(userdata);


        const ispassword=await bcrypt.compare(pwd,userdata.pwd)


        if(ispassword){
            res.send("Login Successfull")
        }else{
            res.send("Invalid Password")
        }


        // if (userdata) {
        //     if (userdata.pwd === pwd) {
        //         res.send("Login Successful");
        //     } else {
        //         res.send("Invalid Password");
        //     }
        // } else {
        //     res.send("User not found");
        // }

        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

app.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('pwd').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, pwd } = req.body;

        //to check if the email alredy exists in DB

        const userdata = await User.findOne({ email: email });
        if (userdata) {
            return res.send("Email Already Exists");
        }

        //bcrypy hashing the password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(pwd, salt)


        //adding to DB

        const newUser = await User.create({ username, email, pwd:hashedPassword });
        await newUser.save();

        // console.log(username);
        // console.log(email);
        // console.log(pwd);

        res.status(201).send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is Running at:${PORT}`);

})