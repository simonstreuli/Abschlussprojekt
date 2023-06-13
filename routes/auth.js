const router = require("express").Router();
const User = require("./models/User");

//Register
router.get("/register", (req, res) => {
  res.send("auth route");
});

module.exports = router;
