const express = require('express');
const app = express();
const Config = require('./config');

const imageRouter = require('./routes/imageRoute');

app.use('/api', imageRouter);
app.use('/uploads', express.static('uploads'));

app.get('/api',(req, res)=>{
    res.send("Welcome to image classification API")
})

app.listen(Config.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}.`)
})

module.exports = app;