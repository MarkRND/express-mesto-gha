/* eslint-disable no-constant-condition */
const messageError = (err, req, res) => {
  if ((err.name === "CastError") || (err.name === "ValidationError")) {
    res.status(400).send({
      message: "переданы некорректные данные ",
    });
    return;
  }

  // if (err.name === "ValidationError") {
  //   res.status(400).send({
  //     message: "Переданы некорректные данные",
  //   });
  //   return;
  // }

  if (err.name === "NotFoundError") {
    res.status(404).send({
      message: "карточка или пользователь не найден.",
    });
    return;
  }

  res.status(500).send({
    message: "Что-то пошло не так",
  });
};

module.exports = { messageError };
