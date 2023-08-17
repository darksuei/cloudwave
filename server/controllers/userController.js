const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');
const { loginToStorage } = require('../utils/loginToStorage');
const { createStorage } = require('../utils/Storage');

const userLogin = async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({message: "User not found"});
        bcrypt.compare(password, user.hash, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (result === true) {
                console.log('Login successful');
                loginToStorage();
                return res.status(200).json({ message: "Login successful" });
            } else {
                console.log('Login failed');
                return res.status(401).json({ message: "Login failed" });
            }
        });
    }catch(err){console.error(err)}
}

const userRegister = async (req, res)=>{
    try{
        const {email, password, ...rest} = req.body;
        const hash = await hashPassword(password,10)
        const jwtToken = generateToken(email);
        const newUser = new User({
            email,
            hash,
            ...rest,
            token: jwtToken   
        })
        console.log(newUser);
        await loginToStorage();
        if (await createStorage(newUser.email)){
            newUser.storage = newUser.email;
            newUser.hasStorage = true;
        }
        const savedUser = await newUser.save();
        console.log(savedUser);
    }catch(err){
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })};
    res.status(201).json({ "message" : "User created successfully" })
}

const hashPassword = async (password, saltRounds) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

const generateToken = (email) => {
    const token = jwt.sign({ email: email }, 'your-secret-key', { expiresIn: '1h' });
    return token;
};

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(token, 'your-secret-key');
      req.user = { _id: decodedToken.id };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

module.exports = {hashPassword, userLogin, userRegister}

