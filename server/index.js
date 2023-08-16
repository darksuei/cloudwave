const express = require('express');
const app = express();
const Config = require('./config');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./utils/database');
const {loginToStorage} = require('./utils/loginToStorage');
const uploadToStorage = require('./utils/uploadToStorage');
const hashPassword = require('./controllers/userController');
const User = require('./models/userSchema');
const bcrypt = require('bcrypt');

const imageRouter = require('./routes/imageRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const { brotliCompressSync } = require('zlib');

app.use(
    cors({
        origin: ['http://localhost:3000']
    })
);

app.use(errorMiddleware)
app.use('/api', imageRouter);
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());

app.get('/', async (req, res)=>{
    await loginToStorage();
    await uploadToStorage();
    res.send("Hello World");
})

app.post('/api',(req, res)=>{
    console.log("Here:",req.body);
    res.status(200).json({ "message" : "Hehe, Welcome to image classification API" })
})

app.post('/api/newuser', async (req, res)=>{
    try{
        const {password, ...rest} = req.body;
        const hash = await hashPassword(password,10)
        const newUser = new User({
            ...rest,
            hash
        })
        await newUser.save();
    }catch(err){console.err(err)}
    res.status(201).json({ "message" : "User created successfully" })
})

app.post('/api/login', async (req, res)=>{
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
                return res.status(200).json({ message: "Login successful" });
            } else {
                console.log('Login failed');
                return res.status(401).json({ message: "Login failed" });
            }
        });
    }catch(err){console.error(err)}
});

app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

app.listen(Config.PORT, ()=>{
    console.log(`Server is running on port ${Config.PORT}.`)
})

module.exports = app;