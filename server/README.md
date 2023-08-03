# ImageVision - RESTful API for Image Recognition 😸

ImageVision is a RESTful API that utilizes image recognition algorithms and machine learning models to identify objects in images. Make requests to this API with images, and the API will return the identified objects with their confidence scores. Please note this API uses pre-trained models and is not perfect.
- Image recognition using TensorFlow.js and MobileNet model.
- Confidence threshold customization for object detection results.
- Model selection option to choose specific image recognition models(in progress).

## Installation

1. Clone the repository:

```

git clone https://github.com/Suei43/imagevision.git

cd imagevision

```

2. Install the dependencies:

```

npm install

```

3. Download the TensorFlow MobileNet model:

To run the API, you need to download the MobileNet model from TensorFlow Hub. You can use the following script to download it:

```bash

node download-model.js

```

## Usage

1. Start the server:

```bash

npm run start

```

2. Make API requests:

Send a POST request to the `/api/image-recognition` endpoint with an image file in the request body. You can also customize the API by setting the confidence threshold and model selection options.

**Example:**

```bash
curl -X POST -F "image=@path/to/your/image.jpg" -F "confidenceThreshold=0.5" -F http://localhost:3000/api/image-recognition
```

## Available Endpoints
- **GET /api:** Welcome message 😁.

- **POST /api/image-recognition:** Perform image recognition on the provided image with optional customization parameters.
  - Request body:
    - image: The image file to be recognized.
    - confidenceThreshold (optional): The confidence threshold for object detection (default: 0.5).
    - model (optional): The specific model to be used for image recognition (default: MobileNet).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the <a href="https://opensource.org/license/mit/">MIT</a> license.
