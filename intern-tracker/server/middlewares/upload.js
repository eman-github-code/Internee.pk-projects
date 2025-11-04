// server/middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g,'-'))
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB
module.exports = upload;
