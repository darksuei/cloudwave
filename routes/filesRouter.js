const authenticate = require("../middlewares/authenticate");
const getSearchFiles = require("../controllers/fileControllers/getSearchFiles");
const getAllFiles = require("../controllers/fileControllers/getAllFiles");
const getFilesByCategory = require("../controllers/fileControllers/getFilesByCategory");
const getCategoryCount = require("../controllers/fileControllers/getCategoryCount");
const postUploadFile = require("../controllers/fileControllers/postUploadFile");
const deleteFile = require("../controllers/fileControllers/deleteFile");
const patchRenameFile = require("../controllers/fileControllers/patchRenameFile");
const getSingleFile = require("../controllers/fileControllers/getSingleFile");
const getFavs = require("../controllers/fileControllers/getFavs");
const patchToggleFav = require("../controllers/fileControllers/patchToggleFav");
const getStorage = require("../controllers/fileControllers/getStorage");
const getImage = require("../controllers/fileControllers/getImage");
const getFileFromCrypt = require("../controllers/fileControllers/getFileFromCrypt");
const getFileFromCryptAndDownload = require("../controllers/fileControllers/getFileFromCryptAndDownload");
const postUploadAvatar = require("../controllers/fileControllers/postUploadAvatar");

const router = require("express").Router();

const upload = require("multer")({ dest: "public/" });

router.get("/search", authenticate, getSearchFiles);

router.get("/files", authenticate, getAllFiles);

router.get("/files/:name", authenticate, getFilesByCategory);

router.get("/file/count", authenticate, getCategoryCount);

router.post("/upload", authenticate, upload.array("files"), postUploadFile);

router.delete("/delete/:name", authenticate, deleteFile);

router.patch("/rename/:name", authenticate, patchRenameFile);

router.get("/getfile/:name", authenticate, getSingleFile);

router.get("/favorites", authenticate, getFavs);

router.patch("/updatefav/:name", authenticate, patchToggleFav);

router.get("/storage", authenticate, getStorage);

router.get("/image/:name", authenticate, getImage);

router.get("/decryptfile/:hash", getFileFromCrypt);

router.get("/downloadfile/:hash", getFileFromCryptAndDownload);

router.post("/uploadavatar", authenticate, upload.array("files"), postUploadAvatar);

module.exports = router;
