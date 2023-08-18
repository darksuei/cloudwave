const {storage, loginToStorage} = require('../utils/loginToStorage');

const {uploadToStorage, getStorageFiles} = require('../utils/Storage');

const { formatDateLabel } = require('../utils/utils');

const getAllFiles = async (req, res) => {
    try{
        await loginToStorage();
        const userFolder = storage.root.children.find(folder => folder.name === req.user.email);
        const folder = userFolder.children.find(folder => folder.name === 'All Files');
        const filelist = await getStorageFiles(folder);
        console.log(filelist);
        if (!filelist)
            return res.status(404).json({message: 'No files found'});
        const files = [];
        for(let i=0; i<filelist.length; i++){
            files.push({
                id: i,
                name: filelist[i],
                time: formatDateLabel(new Date()),
            });
        };
        console.log(files);
        return res.status(200).json({message: 'Files found', files: files});
    }catch(err){
        console.error(err);
        return res.status(404).json({message: err.message});
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

const uploadFile = async (req, res, next) => {
    try {
        await loginToStorage();
        console.log(req.user.email)
        const userFolder = storage.root.children.find(folder => folder.name === req.user.email);
        const folder = userFolder.children.find(folder => folder.name === 'All Files');
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