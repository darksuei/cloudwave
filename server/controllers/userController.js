const bcrypt = require('bcrypt');

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
        const {password, ...rest} = req.body;
        const hash = await hashPassword(password,10)
        const newUser = new User({
            ...rest,
            hash
        })
        await loginToStorage();
        if (await createStorage(newUser.email)){
            newUser.storage = newUser.email;
            newUser.hasStorage = true;
        }
        const savedUser = await newUser.save();
        console.log(savedUser);
    }catch(err){console.error(err)}
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

module.exports = {hashPassword, userLogin, userRegister}

