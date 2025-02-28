<<<<<<< Updated upstream
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const User = require('../model/User')





// const logincontroller = async (req, res) => {
//     try {
//         const { email, pwd } = req.body;
//         const userdata = await User.findOne({ email: email });

//         // console.log(userdata);


//         const ispassword = await bcrypt.compare(pwd, userdata.pwd)


//         if (ispassword) {

//             const token = jwt.sign({ userId: userdata._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
//             console.log(`the jwt token= ${token}`);


//             res.json({ msg: "Login Successfull", token })
//         } else {
//             res.json({ msg: "invalid Password" })

//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server error");

//     }

// }







// const registercontroller = async (req, res) => {
//     try {
//         const { username, email, pwd } = req.body;

//         //to check if the email alredy exists in DB

//         const userdata = await User.findOne({ email: email });

//         if (userdata) {
//             return res.send("Email Already Exists");
//         }

//         //bcrypy hashing the password

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(pwd, salt)


//         //adding to DB

//         const newUser = await User.create({ username, email, pwd: hashedPassword });
//         await newUser.save();

//         // console.log(username);
//         // console.log(email);
//         // console.log(pwd);

//         res.status(201).send('User added successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server error");

//     }
// }





// module.exports = { logincontroller, registercontroller }
=======
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

exports.editUserProfile = async (req, res) => {
    try {
        const { fullname, phone, location } = req.body;

        if (!fullname || !phone || !location) {
            return res.status(400).send({ msg: "Please provide all fields" });
        }

        const user = await User.findByIdAndUpdate(req.userId, { fullname, phone, location }, { new: true });
        res.status(200).send({ msg: "User profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};
>>>>>>> Stashed changes
