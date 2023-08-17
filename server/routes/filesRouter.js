const Router = require("express").Router;

const { getAllFiles, searchFiles, uploadFile, favorites, sharedFiles } = require('../controllers/filesController');

const filesRouter = Router();

filesRouter.get('/search', searchFiles);

filesRouter.get('/allfiles', getAllFiles);

filesRouter.post('/upload', uploadFile);

filesRouter.get('/sharedfiles', sharedFiles);

filesRouter.get('/favorites', favorites);

module.exports = filesRouter;

