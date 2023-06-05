/* eslint-disable consistent-return */
const User = require("../models/user");
const { messageError } = require("../messageError");

const getInfoUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    messageError(err, req, res);
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("Пользователь не найден");
      error.name = "NotFoundError";
      throw error;
    }
    res.send(user);
  } catch (err) {
    messageError(err, req, res);
  }
};

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    messageError(err, req, res);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true },
    );
    res.status(200).json({ avatar: user.avatar });
  } catch (err) {
    messageError(err, req, res);
  }
};
const editUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).json(user);
  } catch (err) {
    messageError(err, req, res);
  }
};

module.exports = {
  getInfoUsers,
  getUserId,
  addUser,
  updateAvatar,
  editUser,
};
