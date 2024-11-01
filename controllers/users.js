const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
// const DuplicateError = require("../errors/DuplicateError");
const NotAuthorized = require("../errors/NotAuthorized");
const NotFound = require("../errors/NotFound");
const { JWT_SECRET } = require("../utils/config");

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(NotFound).send({ message: "User not found" });
      }
      return res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFound("Invalid data"));
      }

      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }

      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then(() => res.status(201).send({ name, avatar, email }))
    .catch((err) => {
      if (err.code === "110000") {
        return next(new BadRequestError("Invalid data"));
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BadRequestError)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new NotAuthorized("Invalid data"));
      }

      return next(err);
    });
};

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFound("Invalid data"));
      }

      return next(err);
    });
};
module.exports = { updateUser, createUser, getUser, login };
