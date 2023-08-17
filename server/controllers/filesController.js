const {storage, loginToStorage} = require('../utils/loginToStorage');

const {uploadToStorage} = require('../utils/Storage');

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

const uploadFile = async (req, res, next) => {
    try {
        await loginToStorage();
        console.log(req.user.email)
        const folder = storage.root.children.find(folder => folder.name === req.user.email);
        for(const file of req.files){
            let status = uploadToStorage(file.originalname, file.path, folder);
            if(status === false)
                res.status(400).json({message: 'Error uploading file'});
        }
        res.status(201).json({message:'Files uploaded successfully'});
    }catch(err){
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

const favorites = (req,res) => {};

const sharedFiles = (req,res) => {};

module.exports = { getAllFiles, searchFiles, uploadFile, favorites, sharedFiles }