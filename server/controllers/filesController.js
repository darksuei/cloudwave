const {storage} = require('../utils/loginToStorage')
const {uploadToStorage} = require('../utils/Storage')

const getAllFiles = async (req, res) => {
    
}

const searchFiles = (req, res) => {
    const { query } = req.query;
    console.log(query);
    try{
        const file = Object.values(storage.files).find(file => file.name === 'hello-world.txt')
        res.status(200).json(file.name);
    }catch(err){
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

const uploadFile = (req, res) => {
    try {
        console.log('hi')
        console.log(req.files)
        res.status(201).json({message:'OK'});
    }catch(err){
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

const favorites = (req,res) => {};

const sharedFiles = (req,res) => {};

module.exports = { getAllFiles, searchFiles, uploadFile, favorites, sharedFiles }