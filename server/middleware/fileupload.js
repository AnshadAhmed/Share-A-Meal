const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'my-upload');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, `${uniqueSuffix}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
