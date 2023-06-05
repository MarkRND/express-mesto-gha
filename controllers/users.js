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
    res.send(user);
  } catch (err) {
    messageError(err, req, res);
  }
};
const editUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    if (!name || !about) {
      return res.status(400).json({ message: "Переданы некорректные данные" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getInfoUsers,
  getUserId,
  addUser,
  updateAvatar,
  editUser,
};
