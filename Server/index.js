const express = require('express');
const app = express();
require('dotenv').config()

const imageRouter = require('./src/routes/imageRoute');

app.use('/api', imageRouter);
app.use('/uploads', express.static('uploads'));

app.get('/api',(req, res)=>{
    res.send("Welcome to image classification API")
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}.`)
})

module.exports = app;