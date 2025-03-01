const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../model/User');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    try {
        const { email, pwd } = req.body;
        const userdata = await User.findOne({ email: email });

        const ispassword = await bcrypt.compare(pwd, userdata.pwd);

        if (ispassword) {
            const token = jwt.sign({ userId: userdata._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
            res.json({ msg: "Login Successful", token });
        } else {
            res.json({ msg: "Invalid Password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    try {
        const { username, email, pwd } = req.body;
        const userdata = await User.findOne({ email: email });

        if (userdata) {
            return res.send("Email Already Exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pwd, salt);

        const newUser = await User.create({ username, email, pwd: hashedPassword });
        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anadn200@gmail.com',
                pass: 'byxa agqx iwbz erld'
            }
        });

        const mailOptions = {
            from: 'anadn200@gmail.com',
            to: newUser.email,
            subject: 'Welcome to share a meal community',
            text: `Your registered email is: ${email} and password is: ${pwd}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};