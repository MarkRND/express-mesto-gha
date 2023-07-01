const jwt = require("jsonwebtoken");
const UnauthorizedError = require('../messageError/UnauthorizedError');
// const { NODE_ENV, JWT_SECRET = "dev-key" } = process.env;

// const { messageError } = require("../messageError/messageError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;
  const token = authorization.replace("Bearer ", "");
  try {
    payload = jwt.verify(
      token,
       "JWT_SECRET"
      // NODE_ENV === "production" ? JWT_SECRET : "dev-key"
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
