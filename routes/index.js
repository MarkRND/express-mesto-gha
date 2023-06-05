const router = require("express").Router();
const { messageError } = require("../messageError");
const usersRoute = require("./users");
const usersCards = require("./cards");

router.use("/users", usersRoute);
router.use("/cards", usersCards);
router.use((req, res) => {
  const err = new Error("Неверный адрес");
  err.name = "NotFoundError";
  messageError(err, req, res);
});

module.exports = router;
