
const User = require('../model/User');
const Food = require('../model/Food');
const Notification=require('../model/Notification')




exports.getalldata = async (req, res) => {
    try {
        const userdata = await User.find({ role: { $ne: "admin" } });
        const fooddata = await Food.find();


        res.status(200).send({ user: userdata, food: fooddata });

    } catch (error) {
        console.log(error);
    }

}



exports.updatestatus = async (req, res) => {
    const { userId, status } = req.body;

    try {
        await User.findByIdAndUpdate(userId, { status });
        res.json({ success: true, message: "User status updated successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user status." });
    }

}



exports.sendnotification = async (req, res) => {
    try {
        const { notification } = req.body;


        const newNoti = await Notification.create({ message:notification });
        await newNoti.save();



    } catch (error) {
        console.log(error);
    }



}
