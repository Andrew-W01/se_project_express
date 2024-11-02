const router = require("express").Router();
const NotFound = require("../errors/NotFound");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

router.use("/items", itemRouter);
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);
router.use(auth);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFound("Resource not found"));
});

module.exports = router;
