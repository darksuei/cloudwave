const mongoose = require("mongoose");

const uri = 'mongodb+srv://Suei:Rrxgio43@cluster0.ryvunza.mongodb.net/Cloudwave?retryWrites=true&w=majority';

const db = mongoose.connect(uri, { useNewUrlParser : true, useUnifiedTopology : true })
  .then(result =>{
    console.log('Succesfully connected to the database.')
})
.catch(err => console.error(err));

module.exports = db;