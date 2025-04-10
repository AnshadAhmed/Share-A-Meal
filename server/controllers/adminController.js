
const User = require('../model/User');
const Food = require('../model/Food');
const Notification = require('../model/Notification')

const nodemailer = require('nodemailer');






exports.getalldata = async (req, res) => {
    try {

        const userdata = await User.find({ role: { $ne: "admin" } });
        const fooddata = await Food.find();
        const admin = await User.findById(req.userId)


        res.status(200).send({ user: userdata, food: fooddata, admindetails: admin });

    } catch (error) {
        console.log(error);
    }

}



exports.updatestatus = async (req, res) => {
    const { userId, status } = req.body;

    try {

        await User.findByIdAndUpdate(userId, { status });

        const userdata = await User.findById(userId);




        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.APP_PASSWORD
            }
        });


        if (status === "Active") {
            const mailOptions = {
                from: process.env.GMAIL,
                to: userdata.email,
                subject: 'Account Status Update - Share A Meal',
                text: `Hello ${userdata.fullname},\n\nWe’re pleased to inform you that your account has been *unblocked* and full access has been restored.
            
            Thank you for your patience. If you have any questions, feel free to reach out to our support team.
            
            Best regards,  
            Share A Meal Team`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });


        }
        else {
            const mailOptions = {
                from: process.env.GMAIL,
                to: userdata.email,
                subject: 'Account Status Update - Share A Meal',
                text: `Hello ${userdata.fullname},\n\nWe regret to inform you that your account has been *blocked* by the Share A Meal admin team due to a violation of our terms or suspicious activity.
                
            You will not be able to access certain features until further notice. If you believe this is a mistake or would like to appeal, please contact our support team.
            
            Best regards,  
            Share A Meal Team`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });


        }



        res.status(200).send({ success: true, message: "User status updated successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user status." });
    }

}



exports.sendnotification = async (req, res) => {
    try {
        const { notification } = req.body;


        const newNoti = await Notification.create({ message: notification });
        await newNoti.save();


        res.status(200).send({ msg: "Notification sended" });
    } catch (error) {
        console.log(error);
    }



}
