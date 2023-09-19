const express = require("express");
const router = express.Router();

const { getCards, postCard } = require("../controllers/cardController");
const { uploadHandler } = require("../middlewares/imageMiddleware");
const uuid = require("uuid").v4;
const { s3Upload } = require("../aws/s3");

router
  .route("/")
  .get(getCards)
  .post(
    uploadHandler.single("image"),
    async (req, res, next) => {
      try {
        const id = uuid();
        const filename = `${id}.${req.file.mimetype.split("/")[1]}`;
        const result = await s3Upload(filename, req.file);
        req.body.imageUrl = result.Location;
        console.log(req.body.imageUrl);
        next();
        //const res = await s3Upload(req.file, )
      } catch (err) {
        throw new Error("add file error");
      }
    },
    postCard
  );

module.exports = router;
