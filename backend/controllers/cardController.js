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
// const deleteCard = asyncHandler(async (req, res) => {
//   const { id } = req.body;
//   if (!id) {
//     res.status(400);
//     throw new Error("Invalid Request");
//   }
//   const card = await Card.findByIdAndDelete(id);
//   if (!card) {
//     res.status(400);
//     throw new Error("Invalid Request");
//   }
//   res.status(200).json(card);
// });

module.exports = {
  getCards,
  postCard,
};
