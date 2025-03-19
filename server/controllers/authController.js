require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require("crypto");
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

        if (!userdata) {
            return res.status(404).json({ msg: "User not found" });
        }
        const ispassword = await bcrypt.compare(pwd, userdata.pwd);


        if (ispassword) {
            const token = jwt.sign({ userId: userdata._id }, process.env.SECRET_KEY, { expiresIn: "8h" });
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
        console.log(req.body);
        
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
                user: process.env.GMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.GMAIL,
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






exports.forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Generate token
        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry in log
        await user.save();

        // Nodemailer transporter initialisation
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        // Send email with reset link to the user 


        const resetLink = `http://localhost:5173/resetpassword/${token}`;
        const mailOptions = {
            from: process.env.GMAIL,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: center; padding: 20px; border: 2px solid black">
                    <p style="font-size: 18px;">Hello ${user.email},</p>
                    <p>We received a request to reset your password.</p>
                    <p>Please click the button below to reset your password:</p>
                    <a href="${resetLink}" style="
                        display: inline-block; 
                        padding: 12px 20px; 
                        font-size: 16px; 
                        font-weight: bold;
                        color: #fff; 
                        background-color: #007bff; 
                        text-decoration: none; 
                        border-radius: 15px;
                        margin-top: 10px;
                    ">
                        Reset Password
                    </a>
                    <p style="margin-top: 20px;">If you did not request this, please ignore this email.</p>
                    <p>Best regards,<br>Share a meal Team</p>
                    </div>

                    `,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });



        res.json({ msg: "Reset link sent to your email" });


    } catch (error) {
        console.log(error);

    }

};





exports.resetpassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword,confirmnewpassword } = req.body;


        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }, // Check expiry
        });

        if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

        // Hash new password
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.pwd = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ msg: "Password updated successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error" });

    }
};
