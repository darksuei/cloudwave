const {storage, loginToStorage} = require('../utils/loginToStorage');

const {uploadToStorage, getStorageFiles} = require('../utils/Storage');

const { formatDateLabel, getCategoryFromFileName } = require('../utils/utils');

const User = require('../models/userSchema');

const { File } = require('megajs');

const getCategoryCount = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const categories = {
            pictures: 0,
            videos: 0,
            audio: 0,
            documents: 0
        };

        if(req.query.favorites==='true'){
            for (const file of user.files) {
                if(file.isFavorite){
                    const category = getCategoryFromFileName(file.name);
                    if (category in categories) {
                        categories[category]++;
                    }
                }
            }
        }else{
            for (const file of user.files) {
                const category = getCategoryFromFileName(file.name);
                if (category in categories) {
                    categories[category]++;
                }
            }
        }
        return res.status(200).json({ message: 'Categories found', categories });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getFilesByCategory = async (req, res) => {
    try{
        await loginToStorage();
        const folder = storage.root.children.find(folder => folder.name === req.user.email);
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
        const folder = storage.root.children.find(folder => folder.name === req.user.email);
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

const searchFiles = async (req, res) => {
    try{
        // const file = Object.values(storage.files).find(file => file.name === 'hello-world.txt');
        const user = await User.findOne({ email: req.user.email });
        console.log(user);
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }
        const files = user.files.filter(file => file.name.includes(req.query.query));
        return res.status(200).json({message: 'OK', files: files});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: err.message});
    }
}

const uploadFile = async (req, res, next) => {
    try {
        await loginToStorage();
        const folder = storage.root.children.find(folder => folder.name === req.user.email);
        for(const file of req.files){
            let status = await uploadToStorage(file.originalname, file.path, folder);
            if(!status){
                return res.status(400).json({message: 'Error uploading file'});
            }
            await User.findOneAndUpdate(
                { email: req.user.email },
                {
                    $push: { files: {
                                name:file.originalname, 
                                date:new Date(), 
                                category:getCategoryFromFileName(file.originalname), 
                                size:(file.size/1024), 
                                isFavorite:true, 
                                link:status 
                            } },

                    $inc: { spaceUsed: file.size / 1024} 
                },
                { new: true })
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

const getStorage = async (req, res)=>{
    const maxStorage = 5;
    const maxStorageKB = maxStorage * 1024 * 1024;
    const user = await User.findOne({ email: req.user.email });
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    const storageUsedKB = Math.round(user.spaceUsed);
    const storageUsedMB = Math.round(storageUsedKB / 1024);
    const storageUsedGB = Math.round(storageUsedKB / (1024*1024));
    let percentage = Math.round((storageUsedKB / maxStorageKB) * 100);

    if (storageUsedKB > 0 && storageUsedKB < 52429){
        percentage = 1;
    }
    if (storageUsedKB > 1024 * 1024){
        return res.status(200).json({message:"Successful", storageUsed: storageUsedGB, unit: "GB", percentage});
    } else if (storageUsedKB > 1024){
        return res.status(200).json({message:"Successful", storageUsed: storageUsedMB, unit: "MB", percentage});
    }
    return res.status(200).json({message:"Successful", storageUsed: storageUsedKB, unit: "KB", percentage});
};

const deleteFile = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.user.email });
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const file = user.files.find(file => file.name === req.params.name);
        if(!file){
            return res.status(404).json({message: 'File not found'});
        }
        await User.findOneAndUpdate({email: req.user.email}, {$inc: {spaceUsed: -(file.size) / 1024} });
        user.files.pull(file);
        await user.save();
        console.log("Successfully deleted!")
        return res.status(200).json({message: 'File deleted successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: err.message});
    }
};

const getSingleFile = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.user.email });
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const file = user.files.find(file => file.name === req.params.name);
        if(!file){
            return res.status(404).json({message: 'File not found'});
        }
        console.log(file)
        return res.status(200).json({message: 'OK', file: file});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: err.message});
    }
};

const getFavs = async (req,res) => {
    try{
        const user = await User.findOne({ email: req.user.email });
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const favs = user.files.filter(file => file.isFavorite);

        if (!favs){
            return res.status(404).json({message: 'No favorites found'});
        }
        favs.map(item => {
            item.time = formatDateLabel(item.date);
            return item;
        })
        return res.status(200).json({message: 'success', favs: favs});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    } 
};

const toggleFav = async (req,res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
    
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const fileToUpdate = user.files.find(file => file.name === req.params.name);
    
        if (!fileToUpdate) {
            return res.status(404).json({message: 'File not found'});
        }

        const newIsFavoriteValue = !fileToUpdate.isFavorite;

        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email, "files.name": req.params.name },
            { $set: { "files.$.isFavorite": newIsFavoriteValue } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({message: 'Error updating file'});
        }
        return res.status(200).json({message: 'File updated successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
    
};

const renameFile = async (req,res) => {
    try {
        const filter = {
            email: req.user.email,
            "files.name": req.params.name
        };
    
        const update = {
            $set: {
                "files.$.name": req.query.newName
            }
        };

        const user = await User.findOneAndUpdate(filter, update, { new: true });
    
        if (!user) {
            return res.status(404).json({ message: 'User or file not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
};

const getImage = async (req, res) => {
    const user = await User.findOne({email: req.user.email}).select('-__v');
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    const filename = await user.files.find(file => file.name == req.params.name);
    if(!filename){
        return res.status(404).json({message: 'File not found.'});
    };
    const fileurl = filename.link;

    const file = File.fromURL(fileurl);
    await file.loadAttributes();
    const stream = file.download();
    stream.on('error', error => console.error(error))
    stream.on('data', data => console.log(data))
    return res.status(200).json({message: 'OK', data: "stream.name"});
};

module.exports = { getAllFiles, getCategoryCount, getFilesByCategory, getStorage, searchFiles, uploadFile, deleteFile, getFavs, toggleFav, renameFile, getImage, getSingleFile }