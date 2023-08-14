const { Storage } = require('megajs');

const storage = new Storage({
  email: 'sueiraphael@gmail.com',
  password: '^y7)8,Y_4b:2JW&',
  userAgent: 'null',
});

const loginToStorage = async () => {
  try {
    await storage.ready;
    console.log('Logged in');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {storage, loginToStorage};
