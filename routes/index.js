const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserBody, validateUser } = require("../middlewares/validation");

router.use("/items", itemRouter);
router.post("/signin", validateUser, login);
router.post("/signup", validateUserBody, createUser);
router.use(auth);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

module.exports = router;
