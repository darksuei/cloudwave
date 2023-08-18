const Router = require("express").Router;

const { getCategoryCount, getAllFiles, getFilesByCategory, searchFiles, uploadFile, favorites, sharedFiles } = require('../controllers/filesController');

const filesRouter = Router();

const multer = require('multer');

const upload = multer({ dest: "utils/public" });

const { authenticate } = require('../utils/authenticate');

filesRouter.get('/search', searchFiles);

filesRouter.get('/files',authenticate, getAllFiles);

filesRouter.get('/files/:name', authenticate, getFilesByCategory);

filesRouter.get('/files/count', authenticate, getCategoryCount);

filesRouter.post('/upload', authenticate, upload.array("files"), uploadFile);

filesRouter.get('/sharedfiles', sharedFiles);

filesRouter.get('/favorites', favorites);

module.exports = filesRouter;

