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

        if (!req.file) {
            return res.status(400).send({ msg: "Please provide Profile image" });

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
        const { mealname, price, location, category, quantity, pickupAddress, discription, option } = req.body;

        if (!req.file) {
            return res.status(400).send({ msg: "Please provide Meal Image To continue" });
        }

        // console.log("Received Data:", req.body);
        // console.log("File Data (if any):", req.file);

        // console.log(mealname, price, location, category, quantity, pickupAddress, discription, option);


        if (!mealname || !price || !location || !category || !quantity || !pickupAddress || !discription || !option) {
            return res.status(400).send({ msg: "Please provide all fields" });
        }

        const newFood = await Food.create({ mealname, price, location, category, quantity, pickupAddress, discription, option, photo: req.file.filename, user_id: req.userId });
        await newFood.save();

        res.status(201).send({ msg: "meal added successfully", data: newFood });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error", error: error.message });
    }
}




exports.viewmeal = async (req, res) => {
    try {

        const user = await User.findById(req.userId);
        // const meal = await Food.find({ location: user.location }).select('-__v -_id');
        const meal = await Food.find({ location: user.location, user_id: { $ne: req.userId } }).select('-__v -_id');

        res.status(200).send(meal);

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error", error: error.message });
    }
}