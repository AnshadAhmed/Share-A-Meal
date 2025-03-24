const User = require('../model/User');
const Food = require('../model/Food');
const Order = require('../model/Order');



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

        const newFood = await Food.create({ mealname, price, location, category, quantity, pickupAddress, discription, option, photo: req.file.filename, user_id: req.userId, owner: req.userId });
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


        await Food.deleteMany({ quantity: 0 });


        const meal = await Food.find({ location: user.location, user_id: { $ne: req.userId } }).select('-__v');



        res.status(200).send(meal);

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error", error: error.message });
    }
}





exports.addtocart = async (req, res) => {
    try {
        const { mealId, quantity, price, image, name, inquantity, prdiscription } = req.body;

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ msg: "User not found" });


        const existingItemIndex = user.cart.findIndex(item => item.mealId === mealId);


        if (existingItemIndex !== -1) {
            user.cart[existingItemIndex].quantity = Math.max(1, user.cart[existingItemIndex].quantity + quantity);
        } else {
            user.cart.push({ mealId, quantity, price, image, name, inquantity, prdiscription });
        }


        await user.save();
        res.json({ message: "Item added to cart" });

    } catch (error) {
        console.log(error);
    }
}






exports.viewcart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const meal = await Food.find({ _id: { $in: user.cart.map(item => item.mealId) } })


        res.status(200).send(user.cart);

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error", error: error.message });
    }
}






exports.deletecart = async (req, res) => {
    try {

        const user = await User.findById(req.userId);

        const cart_id = req.params.id;

        const existingItemIndex = user.cart.findIndex(item => item._id.toString() === cart_id);

        if (existingItemIndex !== -1) {
            user.cart.splice(existingItemIndex, 1);
            await user.save();
            res.json({ msg: "Item removed from cart", success: true });
        } else {
            res.status(404).json({ msg: "Item not found in cart", success: false });
        }



    } catch (error) {
        console.log(error);
    }
}









exports.mymeals = async (req, res) => {
    try {

        const meal = await Food.find({ user_id: req.userId }).select('-__v');
        res.status(200).send(meal);

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error", error: error.message });

    }
}



exports.deletemeal = async (req, res) => {
    try {
        const deletedMeal = await Food.findByIdAndDelete(req.params.id);


        if (!deletedMeal) {
            return res.status(404).json({ msg: "Meal not found" });
        }

        res.status(200).json({ msg: "Deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}




exports.placeorder = async (req, res) => {


    try {
        const { cartItems, paymentMethod } = req.body;

        // console.log(cartItems);

        const userId = req.userId;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ msg: "Cart is empty!" });
        }

        const formattedItems = [];

        for (const item of cartItems) {
            // Find the product in the database

            const product = await Food.findById(item.mealId);

            console.log(product);
            console.log(item);



            if (!product) {
                return res.status(404).json({ msg: `Product not found: ${item.name}` });
            }

            // Check if enough stock is available
            if (product.quantity < item.quantity) {

                return res.status(400).json({ msg: `Insufficient stock for: ${item.name}` });
            }

            // Reduce stock quantity
            product.quantity -= item.quantity;


            await product.save(); // Save updated stock

            // Add to order items
            formattedItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image: product.image
            });
        }

        const totalAmount = formattedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Create the order
        const newOrder = new Order({
            userId,
            items: formattedItems,
            paymentMethod,
            totalAmount,
            status: "Pending"
        });

        await newOrder.save();

        // Clear the user's cart after placing the order
        await User.findByIdAndUpdate(userId, { cart: [] });

        res.status(200).json({ msg: "Order placed successfully!", order: newOrder });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }



}



exports.vieworder = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await Order.find({ userId })
            .populate({
                path: "items.productId", // Ensure this matches your schema
                populate: {
                    path: "owner", // Fetch owner details
                    model: "User", // Explicitly tell Mongoose to use "User" model
                    select: "phone username email "
                }
            });

        if (!orders.length) {
            return res.status(404).json({ msg: "No pending orders found" });
        }

        res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders.map(order => ({
                id: order._id,
                items: order.items.map(item => ({
                    price: item.price,
                    quantity: item.quantity,
                    owner: item.productId.owner ? { // Ensure owner exists
                        id: item.productId.owner._id,
                        name: item.productId.owner.username,
                        email: item.productId.owner.email,
                        phone: item.productId.owner.phone
                    } : null
                })),
                totalAmount: order.totalAmount,
                status: order.status,
                paymentMethod: order.paymentMethod,
                createdAt: order.createdAt
            }))
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};



