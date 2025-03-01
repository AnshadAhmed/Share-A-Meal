const User = require('../model/User');

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