const {storage, loginToStorage} = require('../utils/loginToStorage');

const {uploadToStorage, getStorageFiles} = require('../utils/Storage');

const { formatDateLabel, getCategoryFromFileName } = require('../utils/utils');

const User = require('../models/userSchema');

const getCategoryCount = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const categories = {
            picture: 0,
            video: 0,
            audio: 0,
            document: 0
        };

        for (const file of user.files) {
            const category = getCategoryFromFileName(file.name);
            if (category in categories) {
                categories[category]++;
            }
        }
        console.log("Hello", categories);
        return res.status(200).json({ message: 'Categories found', categories });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getFilesByCategory = async (req, res) => {
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
            const user = await User.findOne({ email: req.user.email });
            if (user) {
                const fileItem = user.files.find(file => file.name === filelist[i] && getCategoryFromFileName(file.name) === req.params.name);
                if (fileItem) {
                    const time = fileItem.date;
                    console.log("Time:", time);
                    files.push({
                        id: i,
                        name: filelist[i],
                        time: formatDateLabel(time)
                    });
                } else {
                    console.log("File not found in user's files array.");
                }
            } else {
                console.log("User not found.");
            }
        };
        console.log(files);
        return res.status(200).json({message: 'Files found', files: files});
    }catch(err){console.error(err);}
};

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
            const user = await User.findOne({ email: req.user.email });
            if (user) {
                const fileItem = user.files.find(file => file.name === filelist[i]);
                if (fileItem) {
                    const time = fileItem.date;
                    console.log("Time:", time);
                    files.push({
                        id: i,
                        name: filelist[i],
                        time: formatDateLabel(time)
                    });
                } else {
                    console.log("File not found in user's files array.");
                }
            } else {
                console.log("User not found.");
            }
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
        const userFolder = storage.root.children.find(folder => folder.name === req.user.email);
        const folder = userFolder.children.find(folder => folder.name === 'All Files');
        for(const file of req.files){
            let status = uploadToStorage(file.originalname, file.path, folder);
            if(status === false)
                return res.status(400).json({message: 'Error uploading file'});
            await User.findOneAndUpdate({ email: req.user.email },{ $push: { files: {name:file.originalname, date:new Date(), category:getCategoryFromFileName(file.originalname) } } }, { new: true })
            .then(updatedUser => {
                if (updatedUser) {
                    console.log('User updated successfully:', updatedUser);
                } else {
                    console.log('User not found or not updated.');
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }
        return res.status(201).json({message:'Files uploaded successfully'});
    }catch(err){
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

const favorites = (req,res) => {};

const sharedFiles = (req,res) => {};

module.exports = { getAllFiles, getCategoryCount, getFilesByCategory, searchFiles, uploadFile, favorites, sharedFiles }