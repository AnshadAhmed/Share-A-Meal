const User = require('../model/User');
const Food = require('../model/Food');



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
        // console.log(req.file);


        if (!fullname || !phone || !location) {
            return res.status(400).send({ msg: "Please provide all fields" });
        }

        // console.log(req.body);


        const user = await User.findByIdAndUpdate(req.userId, { fullname, phone, location, profilePicture: req.file.filename }, { new: true });
        res.status(200).send({ msg: "User profile updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};


exports.addmeal = async (req, res) => {
    try {

        const { mealname, price, location, category, quantity, pickupAddress, description, option } = req.body

        const newFood = await Food.create({ mealname, price, location, category, quantity, pickupAddress, description, option, photo: req.file.filename, user_id: req.userId })
        await newFood.save()

        // console.log(req.userId);

        res.status(200).send({ msg: "meal added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");


    }
}