const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");
const { validateAuthentication } = require("../middlewares/validation");

router.get("/me", getUser);
router.patch("/me", validateAuthentication, updateUser);

module.exports = router;
