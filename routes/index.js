const router = require("express").Router();
const usersRoute = require("./users");
const usersCards = require("./cards");
const NotFoundError = require("../messageError/NotFoundError");

router.use("/users", usersRoute);
router.use("/cards", usersCards);
router.use((req, res, next) => {
  next(new NotFoundError("Неверный адрес"));
});

module.exports = router;
