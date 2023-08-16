const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();

let upload = multer({ dest: 'public' })

router.post('/image-recognition', upload.single('image'), imageController);

router.get('/image-recognition', (req, res) => {
    res.send('index');
})

module.exports = router;