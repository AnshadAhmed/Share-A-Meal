const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;