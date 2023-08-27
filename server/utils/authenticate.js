require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = await req.headers.authorization.split(' ')[1];

    if (token === undefined) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticate };