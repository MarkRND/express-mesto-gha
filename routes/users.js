const router = require("express").Router();
const {
  getInfoUsers, getUserId, addUser, updateAvatar, editUser,
} = require("../controllers/users");

router.get("/:id", getUserId);
router.get("/", getInfoUsers);
router.post("/", addUser);
router.patch("/users/me", editUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
