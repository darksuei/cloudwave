const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();

let upload = multer({ dest: 'public' })

router.post('/image-recognition', upload.single('image'), imageController);

module.exports = router;