const Card = require("../models/card");
const { messageError } = require("../messageError");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    messageError(err, req, res);
  }
};

const getCardId = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      const error = new Error("Карточка не найдена");
      error.name = "NotFoundError";
      throw error;
    }
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

const addCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

const addLikeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      const error = new Error("Нет такой карточки");
      error.name = "NotFoundError";
      throw error;
    }
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

const deleteLikeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      const error = new Error("Нет такой карточки");
      error.name = "NotFoundError";
      throw error;
    }
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      const error = new Error("Нет такой карточки");
      error.name = "NotFoundError";
      throw error;
    }
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
  getCardId,
};