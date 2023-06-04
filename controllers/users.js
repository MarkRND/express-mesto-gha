const User = require('../models/user');

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Что-то пошло не так', err: err.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200)
      .send(users)
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Что-то пошло не так? жопа', err: err.message });
      }));
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Что-то пошло не так', err: err.message });
    });
};

module.exports = { getUserById, getUsers, createUser };
