const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
        var decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const newUser = new User({
            email,
            hash,
            ...rest,
            token: jwtToken   
        })
        await loginToStorage();
        if (await createStorage(newUser.email)){
            newUser.storage = newUser.email;
            newUser.hasStorage = true;
        }
        await newUser.save();
        return res.status(201).json({ "message" : "User created successfully", "token" : newUser.token })
    }catch(err){
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })};
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
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = {hashPassword, userLogin, userRegister}

