const express = require('express');
const { getUserProfile, editUserProfile, addmeal, viewmeal, mymeals, deletemeal, addtocart, viewcart, deletecart, placeorder, vieworder, cancelorder, getsupplierorder, supplierorderupdation } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const uploade=require('../middleware/fileupload');
const { addmealvalidation } = require('../middleware/validate');

const router = express.Router();

router.get('/userprofile', verifyToken, getUserProfile);
router.put('/edituserprofile', verifyToken,uploade.single("profile-pic"), editUserProfile);


router.post('/addmeal',verifyToken,uploade.single("food-image"),addmealvalidation,addmeal)
router.get('/viewmeal',verifyToken,viewmeal)


router.post('/addtocart',verifyToken,addtocart)
router.get('/viewcart',verifyToken,viewcart)
router.delete('/viewcart/del/:id',verifyToken,deletecart)


router.get('/mymeal',verifyToken,mymeals)
router.delete('/mymeal/del/:id',deletemeal)


router.post('/placeorder',verifyToken,placeorder)
router.get('/vieworder',verifyToken,vieworder)
router.post('/vieworder/cancel/:id',cancelorder)


router.get('/supplier-order',verifyToken,getsupplierorder)
router.patch('/update-collector-order/:id',supplierorderupdation)

module.exports = router;