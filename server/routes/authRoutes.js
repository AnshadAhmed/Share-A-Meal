const express = require('express');
const { login, register, forgotpassword, resetpassword } = require('../controllers/authController');
const { loginvalidation, registervalidation } = require('../middleware/validate');

const router = express.Router();

router.post('/login', loginvalidation, login);
router.post('/register', registervalidation, register);
router.post('/forgotpassword',forgotpassword)
router.post('/resetpassword/:token', resetpassword)
module.exports = router;