const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { email, pwd } = req.body;
        const userdata = await User.findOne({ email: email });

        if (!userdata) {
            return res.status(400).json({ msg: "User not found" });
        }

        const ispassword = await bcrypt.compare(pwd, userdata.pwd);

        if (ispassword) {
            const token = jwt.sign({ userId: userdata._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
            res.json({ msg: "Login Successful", token });
        } else {
            res.status(400).json({ msg: "Invalid Password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, pwd } = req.body;

        const userdata = await User.findOne({ email: email });

        if (userdata) {
            return res.status(400).json({ msg: "Email Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pwd, salt);

        const newUser = await User.create({ username, email, pwd: hashedPassword });
        await newUser.save();

        res.status(201).send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};