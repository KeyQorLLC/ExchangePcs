const asyncHandler = require("express-async-handler");
const Card = require("../models/cardModel");

/**
 * @desc   Get all cards
 * @route  Get /api/card
 * @access PUBLIC
 */
const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find(req.query).select({ __v: 0 });

  res.status(200).json(cards);
});

/**
 * @desc   Post card
 * @route  POST /api/card
 * @access PUBLIC
 */
const postCard = asyncHandler(async (req, res) => {
  const { condition, group, member, album, description, user, name, imageUrl } =
    req.body;
  const card = await Card.create({
    imageUrl: imageUrl,
    condition: condition || "default Good",
    group: group,
    member: member,
    album: album,
    description: description || "no description from user",
    user: user,
    name: name,
  });
  if (card) {
    res.status(201).json(card);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

module.exports = {
  getCards,
  postCard,
};
