const express = require('express');
const app = express();
const Config = require('./config');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./utils/database');

const imageRouter = require('./routes/imageRoute');
const userRouter = require('./routes/userRouter');
const fileRouter = require('./routes/filesRouter');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(
    cors({
        origin: ['http://localhost:3000']
    })
);

app.use(errorMiddleware)
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', imageRouter);
app.use('/api',userRouter);
app.use('/api',fileRouter)

app.get('/', async (req, res)=>{
    await loginToStorage();
    await uploadToStorage();
    res.send("Hello World");
})

app.post('/api',(req, res)=>{
    res.status(200).json({ "message" : "Welcome" })
})

app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

app.listen(Config.PORT, ()=>{
    console.log(`Server is running on port ${Config.PORT}.`)
})

module.exports = app;