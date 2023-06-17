const router = require("express").Router();
const { messageError } = require("../messageError/messageError");
const usersRoute = require("./users");
const usersCards = require("./cards");
const { addUser,
   login
  } = require("../controllers/users");
const auth = require("../middlwares/auth");


router.post("/signup", addUser);
router.post("/signin", login);

router.use(auth);
router.use("/users", usersRoute);
router.use("/cards", usersCards);
router.use((req, res) => {
  const err = new Error("Неверный адрес");
  err.name = "NotFoundError";
  messageError(err, req, res);
});

module.exports = router;
