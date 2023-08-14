const express = require('express');
const app = express();
const Config = require('./config');
const cors = require('cors');
const path = require('path');
const {loginToStorage} = require('./utils/loginToStorage');
const uploadToStorage = require('./utils/uploadToStorage');

const imageRouter = require('./routes/imageRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(cors());
app.use(errorMiddleware)
app.use('/api', imageRouter);
app.use('/uploads', express.static('uploads'));

app.get('/', async (req, res)=>{
    await loginToStorage();
    await uploadToStorage();
    res.send("Hello World");
})

app.get('/api',(req, res)=>{
    res.status(200).json({ "message" : "Welcome to image classification API" })
})

app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

app.listen(Config.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}.`)
})

module.exports = app;