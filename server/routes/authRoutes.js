const express = require('express');
const { login, register, forgotpassword, resetpassword } = require('../controllers/authController');
const { loginvalidation, registervalidation, forgotpassvalidation, resetpassvalidation } = require('../middleware/validate');

const router = express.Router();

router.post('/login', loginvalidation, login);
router.post('/register', registervalidation, register);
router.post('/forgotpassword', forgotpassvalidation,forgotpassword)
router.post('/resetpassword/:token', resetpassvalidation,resetpassword)
module.exports = router;