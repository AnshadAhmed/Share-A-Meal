const express = require('express');
const { getalldata, updatestatus, sendnotification } = require('../controllers/adminController');
const verifyadmin = require('../middleware/verifyadmin');

const router = express.Router();

router.get('/admin-main',verifyadmin,getalldata)
router.put('/update-user-status',verifyadmin,updatestatus)

router.post('/send-notification',verifyadmin,sendnotification)







module.exports = router;