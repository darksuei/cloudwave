const sharp = require('sharp');
const detectObject = require('../utils/detection');

const imageController = async (req, res) => {
    if (!req.file)
      return res.status(400).json({ error: 'Please upload an image' });

    //If user specifies a confidence threshold, check if it is between 0 and 1
    if(req.body.confidenceThreshold){
      if(req.body.confidenceThreshold < 0 || req.body.confidenceThreshold > 1){
        return res.status(400).json({ error: 'Confidence threshold must be between 0 and 1' });
      }
    }
  
    const processedImageBuffer = await sharp(req.file.path)
    .resize(224, 224)
    .toFormat('jpeg')
    .toBuffer();

    detectObject(processedImageBuffer, confidenceThreshold = req.body.confidenceThreshold || 0.1)
    .then((imageClassification) => {
      res.status(200).json({
        message: 'Image classification successful',
        classification: imageClassification,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: err, message: 'Image classification failed' });
    });
};

module.exports = imageController;