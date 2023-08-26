const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userSchema');
const { loginToStorage } = require('../utils/loginToStorage');
const { createStorage } = require('../utils/Storage');

const getUser = async (req, res)=>{
    try{
        const user = await User.findOne({email:req.user.email});
        if(!user) return res.status(404).json({message: "User not found"});
        return res.status(200).json({message:"success",user});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
};

const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email is not registered!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.hash);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect Password!" });
      }

      const newToken = generateToken(user.email);

      user.token = newToken;
      await user.save();
  
      return res.status(200).json({ message: "Login successful!", token: newToken });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
  

const userRegister = async (req, res) => {
    try {
      const { email, password, ...rest } = req.body;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please use a valid email format!" });
      }
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already registered!" });
      }

      const minPasswordLength = 6;
      if (password.length < minPasswordLength) {
        return res.status(400).json({ message: `Password must be at least ${minPasswordLength} characters long!` });
      }
  
      const hash = await hashPassword(password, 10);
      const jwtToken = generateToken(email);
      const verifyJWT = jwt.verify(jwtToken, process.env.JWT_SECRET);
      if (!verifyJWT) {
        return res.status(401).json({ message: "Invalid token." });
      }
      const newUser = new User({
        email,
        hash,
        ...rest,
        token: jwtToken,
      });
  
      await loginToStorage();
      if (await createStorage(newUser.email)) {
        newUser.storage = newUser.email;
        newUser.hasStorage = true;
      }
  
      await newUser.save();
      return res.status(201).json({ message: "User created successfully", token: newUser.token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
};
  

const userUpdate = async (req, res) => {
    try {
        const { firstname, lastname, phone } = req.body;
        const updateFields = {};

        if (firstname) updateFields.firstname = firstname;
        if (lastname) updateFields.lastname = lastname;
        if (phone) updateFields.phone = phone;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        const user = await User.findOneAndUpdate({ email: req.user.email }, updateFields, { new: true });
        console.log(user);
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

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

module.exports = {hashPassword, userLogin, userRegister, userUpdate, getUser}

