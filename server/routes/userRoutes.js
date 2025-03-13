const express = require('express');
const { getUserProfile, editUserProfile, addmeal } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const uploade=require('../middleware/fileupload')

const router = express.Router();

router.get('/userprofile', verifyToken, getUserProfile);
router.put('/edituserprofile', verifyToken,uploade.single("profile-pic"), editUserProfile);
router.post('/addmeal',verifyToken,uploade.single("food-image"),addmeal)

module.exports = router;