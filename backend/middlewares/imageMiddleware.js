const multer = require("multer");
const storage = multer.memoryStorage();
const uploadHandler = multer({ storage, limits: { fileSize: 1000000 } });

module.exports = {
  uploadHandler,
};
