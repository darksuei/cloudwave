const request = require('supertest');
const app = require('../src/index');

describe('Image Upload and Handling Tests', () => {
  test('Image Upload and Recognition', async () => {
    // Replace 'image_path_to_test.jpg' with the path to the image you want to test
    const response = await request(app)
      .post('/api/recognize')
      .attach('image', 'npp.jpg');

    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});