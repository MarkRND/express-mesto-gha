const router = require("express").Router();
const NotFoundError = require("../messageError/NotFoundError");
const usersRoute = require("./users");
const usersCards = require("./cards");

router.use("/users", usersRoute);
router.use("/cards", usersCards);
router.use(() => {
  throw new NotFoundError("Неверный адрес");
});

module.exports = router;
