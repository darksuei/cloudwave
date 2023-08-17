const Router = require("express").Router;

const { getAllFiles, searchFiles, uploadFile, favorites, sharedFiles } = require('../controllers/filesController');

const filesRouter = Router();

const multer = require('multer');

const upload = multer({ dest: "utils/public" });

filesRouter.get('/search', searchFiles);

filesRouter.get('/allfiles', getAllFiles);

filesRouter.post('/upload', upload.array("files"), uploadFile);

filesRouter.get('/sharedfiles', sharedFiles);

filesRouter.get('/favorites', favorites);

module.exports = filesRouter;

