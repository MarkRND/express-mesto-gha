const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/user");
const { messageError } = require("../messageError/messageError");

const NotFoundError = require("../messageError/NotFoundError");
// const UnauthorizedError = require("../messageError/UnauthorizedError");

const getInfoUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError("Пользователь не найден");
    }
    res.send(user);
  } catch (err) {
    messageError(err, req, res);
  }
};

const getInfoId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError("Пользователь не найден"));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    res.send(user);
  } catch (err) {
    messageError(err, req, res);
    next(err);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
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
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    );
    res.status(200).json(user);
  } catch (err) {
    messageError(err, req, res);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const err = new Error("Неверный email или password");
      err.name = "UnauthorizedError";
      messageError(err, req, res);
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      const err = new Error("Неверный password или email");
      err.name = "UnauthorizedError";
      messageError(err, req, res);
    }
    const token = jsonwebtoken.sign(
      {
        _id: user._id,
      },
      "unique-secret-key",
      {
        expiresIn: "7d",
      }
    );
    res.send({ jwt: token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getInfoUsers,
  getUserId,
  getInfoId,
  addUser,
  updateAvatar,
  editUser,
  login,
};
