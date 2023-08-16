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
const User = require('./models/userSchema')

const imageRouter = require('./routes/imageRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

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

app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

app.listen(Config.PORT, ()=>{
    console.log(`Server is running on port ${Config.PORT}.`)
})

module.exports = app;