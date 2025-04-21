const User = require('../model/User');
const Food = require('../model/Food');
const Order = require('../model/Order');
const Notification = require('../model/Notification')


const nodemailer = require('nodemailer');




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
        const { mealname, price, location, category, quantity, pickupAddress, discription, option, latitude, longitude } = req.body;


        if (!req.file) {
            return res.status(400).send({ msg: "Please provide Meal Image To continue" });
        }

        // console.log("Received Data:", req.body);
        
        console.log("File Data (if any):", req.file);

        // console.log(mealname, price, location, category, quantity, pickupAddress, discription, option);


        if (!mealname || !price || !location || !category || !quantity || !pickupAddress || !discription || !option) {
            return res.status(400).send({ msg: "Please provide all fields" });
        }

        const newFood = await Food.create({ mealname, price, location, category, quantity, pickupAddress, discription, option, photo: req.file.filename, user_id: req.userId, owner: req.userId, latitude, longitude });
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


        // await Food.updateMany({ quantity: 0 }, { status: "Sold-Out" });


        await Food.updateMany({}, [
            {
                $set: {
                    status: {
                        $cond: {
                            if: { $eq: ["$quantity", 0] },
                            then: "Sold-Out",
                            else: {
                                $cond: {
                                    if: { $gt: ["$quantity", 0] },
                                    then: "Available",
                                    else: "Unknown"
                                }
                            }
                        }
                    }
                }
            }
        ]);


        const meal = await Food.find({ location: user.location, status: "Available", user_id: { $ne: req.userId } }).select('-__v');



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
            user.cart.push({ mealId, quantity, price, image, name, inquantity, prdiscription, MEALID: mealId });
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

        const userdata = await User.findById(userId);


        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ msg: "Cart is empty!" });
        }

        const formattedItems = [];

        for (const item of cartItems) {

            // Find the product in the database

            const product = await Food.findById(item.mealId);



            if (!product) {
                return res.status(404).json({ msg: `Product not found: ${item.name}` });
            }

            // Check if enough stock is available
            if (product.quantity < item.quantity) {

                return res.status(400).json({ msg: `Insufficient stock for: ${item.name}` });
            }

            // to check if it it is been sold out
            if (product.status === "Sold-Out") {
                return res.status(400).json({ msg: `Product is sold out: ${item.name}` });
            }

            // console.log(product);


            // Reduce stock quantity
            product.quantity -= item.quantity;


            await product.save(); // Save updated stock

            // Add to order items
            formattedItems.push({
                productId: product._id,
                name: product.mealname,
                price: product.price,
                quantity: item.quantity,
                image: product.photo
            });
        }

        const totalAmount = formattedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Create the order
        const newOrder = new Order({
            userId,
            items: formattedItems,
            paymentMethod,
            totalAmount,
            status: "Confirmed"
        });

        await newOrder.save();

        // Clear the user's cart after placing the order
        await User.findByIdAndUpdate(userId, { cart: [] });





        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.APP_PASSWORD
            }
        });


        const mailOptions = {
            from: process.env.GMAIL,
            to: userdata.email,
            subject: 'Order Confirmation - Share A Meal',
            text: `Hello ${userdata.fullname},\n\nThank you for your order! Your order has been successfully placed.
            \nPlease contact the respective user within 3 hours of order placement or collect the order. Otherwise, the supplier may cancel the order from their end.
            \nWe appreciate your support in sharing meals with the community.
            \nFor more information visit our website.
            \nBest regards,
            \nShare A Meal Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });





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
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                    owner: item.productId.owner ? { // Ensure owner exists
                        id: item.productId.owner._id,
                        name: item.productId.owner.username,
                        email: item.productId.owner.email,
                        phone: item.productId.owner.phone,
                        address: item.productId.pickupAddress
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



exports.cancelorder = async (req, res) => {
    try {
        const orderId = req.params.id;

        // console.log(orderId);

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(400).json({ msg: 'Order not found' });
        }

        if (order.status === 'Cancelled') {
            return res.status(400).json({ msg: 'Order is already cancelled' });
        }
        if (order.status === 'Collected') {
            return res.status(400).json({ msg: 'Order is already collected' });
        }



        order.status = "Cancelled";
        await order.save();

        // console.log(order);


        for (let item of order.items) {
            const product = await Food.findById(item.productId);
            product.quantity += item.quantity;

            // product.status="Available"

            await product.save();

            if (!product) {
                console.log(`Product not found: ${item.productId}`);
            }

            // console.log(product);

        }

        res.status(200).send({ msg: "order cancelled" })

    } catch (error) {
        console.log(error);
    }

}






exports.getsupplierorder = async (req, res) => {
    try {
        const supplierId = req.userId;

        // Fetch orders and populate product details including owner info
        const orders = await Order.find()
            .populate({
                path: "items.productId",
                model: "Food",
                populate: {
                    path: "owner", // Owner information
                    model: "User",
                    select: "name email phone", // Selecting only relevant details
                },
            })
            .populate("userId", "username email phone"); // Customer details

        // Filter out items that don't belong to the requested supplier
        const filteredOrders = orders
            .map(order => {
                const supplierItems = order.items.filter(
                    item => item.productId && item.productId.owner && item.productId.owner._id.toString() === supplierId
                );

                if (supplierItems.length > 0) {
                    return {
                        _id: order._id,
                        customer: order.userId, // Customer details
                        items: supplierItems, // Only relevant products
                        totalAmount: order.totalAmount,
                        status: order.status,
                        mode: order.paymentMethod,
                        createdAt: order.createdAt,
                    };
                }
                return null;
            })
            .filter(order => order !== null);

        // console.log(filteredOrders);


        res.status(200).json(filteredOrders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }

}







exports.supplierorderupdation = async (req, res) => {
    try {
        const orderId = req.params.id;
        const bt_status = req.body.status;

        if (!bt_status) {
            return res.status(400).json({ msg: "Please provide a status" });
        }

        const order = await Order.findById(orderId).populate('userId');

        console.log(order);

        console.log(order.userId.email);



        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        if (order.status === 'Cancelled') {
            return res.status(400).json({ msg: "Order is already cancelled" });
        }

        if (order.status === 'Collected') {
            return res.status(400).json({ msg: "Order is already collected" });
        }




        if (bt_status === "Cancelled") {

            for (let item of order.items) {
                const product = await Food.findById(item.productId);
                product.quantity += item.quantity;

                // product.status="Available"

                await product.save();

                if (!product) {
                    console.log(`Product not found: ${item.productId}`);
                }

                // console.log(product);

            }



            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL,
                    pass: process.env.APP_PASSWORD
                }
            });


            const mailOptions = {
                from: process.env.GMAIL,
                to: order.userId.email,
                subject: 'Order Cancellation - Share A Meal',
                text: `Hello ${order.userId.username},\n\nWe regret to inform you that your order has been canceled by the supplier. 
                \nIf you have any questions or need further assistance, please reach out to us or visit our website for more details.
                \nWe appreciate your understanding and support in sharing meals with the community.
                \nBest regards,
                \nShare A Meal Team`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            order.status = bt_status;

            await order.save();


            return res.status(200).send({ msg: "Order updated successfully" })


        }

        order.status = bt_status;

        await order.save();



        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.APP_PASSWORD
            }
        });


        const mailOptions = {
            from: process.env.GMAIL,
            to: order.userId.email,
            subject: 'Thank You for Being a Valued Member - Share A Meal',
            text: `Hello ${order.userId.username},\n\nWe sincerely appreciate you for collecting your order and being an active member of the Share A Meal community. Your participation helps us create a more caring and connected world, one meal at a time.  
            \nYour support makes a real difference, and we’re grateful to have you as part of our journey. If you have any feedback or need assistance, feel free to reach out to us or visit our website.  
            \nThank you for being a valued member of Share A Meal! We look forward to continuing this journey with you.  
            \nBest regards,  
            \nThe Share A Meal Team`
        };



        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });






        res.status(200).send({ msg: "Order updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}







exports.viewnotification = async (req, res) => {

    try {
        const notification = await Notification.find()

        res.status(200).send(notification)

    } catch (error) {
        console.log(error);
    }

}