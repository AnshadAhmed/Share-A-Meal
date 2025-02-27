require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

const nodemailer = require('nodemailer');


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const { loginvalidation, registervalidation } = require('./middleware/validate')

const db = require('./model/db')
db.connect()
const User = require('./model/User')



app.use(express.json())


const cors = require('cors')
const verifyToken = require('./middleware/authmiddleware');
app.use(cors())







app.post("/login", loginvalidation, async (req, res) => {


    try {
        const { email, pwd } = req.body;
        const userdata = await User.findOne({ email: email });

        // console.log(userdata);


        const ispassword = await bcrypt.compare(pwd, userdata.pwd)


        if (ispassword) {



            const token = jwt.sign({ userId: userdata._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
            console.log(`the jwt token= ${token}`);


            res.json({ msg: "Login Successfull", token })
        } else {
            res.json({ msg: "invalid Password" })

        }


    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});







app.post('/register', registervalidation, async (req, res) => {

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

        const newUser = await User.create({ username, email, pwd: hashedPassword });
        await newUser.save();



        // genate and send emaail to the correct user


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anadn200@gmail.com',  // Replace with your email
                pass: 'byxa agqx iwbz erld' // the appa password generated from google
            }
        });

        const mailOptions = {
            from: 'anadn200@gmail.com',
            to: newUser.email,
            subject: 'Welcome to share a meal community',
            text: `your registerd email is: ${email} and password is: ${pwd}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });



        // console.log(username);
        // console.log(email);
        // console.log(pwd);

        res.status(201).send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});






app.get('/', (req, res) => {

    res.send(req.userId)
})







app.get('/userprofile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId)



        console.log(`user profile is: ${req.userId}`);

        console.log(user);


        res.send(user)

    } catch (error) {
        console.log(error);


    }


})

app.put('/edituserprofile', verifyToken, async (req, res) => {
    try {
        const { fullname, phone, location } = req.body;


        if (!fullname || !phone || !location) {
            return res.status(400).send({ msg: "Please provide all fields" });
        }

        const user = await User.findByIdAndUpdate(req.userId, { fullname, phone, location }, { new: true });
        res.status(200).send({ msg: "User profile updated successfully" })


        console.log(user);

    } catch (error) {
        console.log(error);

    }

})



app.listen(PORT, () => {
    console.log(`Server is Running at:${PORT}`);

})