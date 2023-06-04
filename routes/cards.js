const router = require("express").Router();
const {
  getCards,
  addCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
  getCardId,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", addCard);
router.get("/:cardId", getCardId);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", addLikeCard);
router.delete("/:cardId/likes", deleteLikeCard);

module.exports = router;
