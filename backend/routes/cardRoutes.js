const express = require("express");
const router = express.Router();

const { getCards, postCard } = require("../controllers/cardController");

router.route("/").get(getCards).post(postCard);

module.exports = router;
