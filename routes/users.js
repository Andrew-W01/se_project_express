const router = require("express").Router();
const { getUsers, getUser } = require("../controllers/users");
router.get("/me", getUser);
router.patch("/me", getUsers);
module.exports = router;
