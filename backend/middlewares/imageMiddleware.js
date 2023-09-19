const multer = require("multer");
//const uuid = require("uuid").v4;
const storage = multer.memoryStorage();
/*
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const id = uuid();
    req.body.imageUrl = id;
    callback(null, `${id}.${file.mimetype.split("/")[1]}`);
  },
});
*/
const uploadHandler = multer({ storage, limits: { fileSize: 1000000 } });

module.exports = {
  uploadHandler,
};
