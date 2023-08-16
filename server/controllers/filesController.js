const {storage} = require('../utils/loginToStorage')
const {uploadToStorage} = require('../utils/Storage')

const getAllFiles = async (req, res) => {
    try {
        console.log(storage.root.children[0])
        res.send('OK')
    }catch(err){
        console.error(err);
        res.status(404).json({message: err.message});
    }
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
    const { file } = req.body;
    try{
        res.status(200).json({message: 'File uploaded successfully'});
    }catch(err){
        console.error(err);
        res.status(404).json({message: err.message});
    }   
}

const favorites = (req,res) => {};

const sharedFiles = (req,res) => {};

module.exports = { getAllFiles, searchFiles, uploadFile, favorites, sharedFiles }