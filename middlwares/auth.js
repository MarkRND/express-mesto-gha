const jwt = require("jsonwebtoken");

const { messageError } = require("../messageError/messageError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {

    const err = new Error("Необходима авторизация");
    err.name = "UnauthorizedError";
    messageError(err, req, res);
  }
  let payload;
  const token = authorization.replace("Bearer ", "");
  try {
    payload = jwt.verify(token, "unique-secret-key");
  } catch (error) {
    const err = new Error("Необходима авторизация");
    err.name = "UnauthorizedError";
    messageError(err, req, res);
  }
  req.user = payload;
  next();
};

module.exports = auth;
