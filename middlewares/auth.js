const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const NotAuthorized = require("../errors/NotAuthorized");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === "Bearer null" || !authorization.startsWith("Bearer ")) {
    throw new NotAuthorized("User isn't logged in");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new NotAuthorized("Invalid token");
  }

  req.user = payload;

  return next();
};
module.exports = auth;
