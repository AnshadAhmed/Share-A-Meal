const express = require('express');
const { getUserProfile, editUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const uploade=require('../middleware/fileupload')

const router = express.Router();

router.get('/userprofile', verifyToken, getUserProfile);
router.put('/edituserprofile', verifyToken,uploade.single("profile-pic"), editUserProfile);

module.exports = router;