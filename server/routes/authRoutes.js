const express = require('express');
const { login, register } = require('../controllers/authController');
const { loginvalidation, registervalidation } = require('../middleware/validate');

const router = express.Router();

router.post('/login', loginvalidation, login);
router.post('/register', registervalidation, register);

module.exports = router;