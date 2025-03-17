const express = require('express');
const { getUserProfile, editUserProfile, addmeal, viewmeal, mymeals } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const uploade=require('../middleware/fileupload');
const { addmealvalidation } = require('../middleware/validate');

const router = express.Router();

router.get('/userprofile', verifyToken, getUserProfile);
router.put('/edituserprofile', verifyToken,uploade.single("profile-pic"), editUserProfile);
router.post('/addmeal',verifyToken,uploade.single("food-image"),addmealvalidation,addmeal)
router.get('/viewmeal',verifyToken,viewmeal)
router.get('/mymeal',verifyToken,mymeals)

module.exports = router;