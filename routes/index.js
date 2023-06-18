const router = require("express").Router();
const { messageError } = require("../messageError/messageError");
const usersRoute = require("./users");
const usersCards = require("./cards");
const { addUser, login } = require("../controllers/users");
const auth = require("../middlwares/auth");
const { validationSignin, validationSignup } = require("../middlwares/celebrateJoi");

router.post("/signup", validationSignup, addUser);
router.post("/signin", validationSignin, login);

router.use(auth);
router.use("/users", usersRoute);
router.use("/cards", usersCards);

module.exports = router;
