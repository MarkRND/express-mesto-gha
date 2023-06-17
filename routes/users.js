const router = require("express").Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getInfoUsers, getUserId, getInfoId, addUser, updateAvatar, editUser,  } = require("../controllers/users");

router.get("/me", getInfoId);
router.get("/:id", getUserId);
router.get("/", getInfoUsers);

router.post("/", addUser);
router.patch("/me", editUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
