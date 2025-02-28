const express = require('express');
const { getUserProfile, editUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/userprofile', verifyToken, getUserProfile);
router.put('/edituserprofile', verifyToken, editUserProfile);

module.exports = router;