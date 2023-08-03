const express = require('express');
const app = express();
const Config = require('./config');

const imageRouter = require('./routes/imageRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(errorMiddleware)
app.use('/api', imageRouter);
app.use('/uploads', express.static('uploads'));

app.get('/api',(req, res)=>{
    res.send("Welcome to image classification API")
})

app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

app.listen(Config.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}.`)
})

module.exports = app;