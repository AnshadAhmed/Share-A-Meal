const jwt = require('jsonwebtoken');
const User = require('../model/User');





const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decode.userId;


        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        if (user.status === "Blocked") {
            return res.status(404).json({ error: "user has been blocked" });
        }
        if (user.role === "admin") {
            return res.status(404).json({ error: "Admin have no access to this part" });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;