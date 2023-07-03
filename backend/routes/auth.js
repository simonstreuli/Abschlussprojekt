const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPasword,
    });

    // save the new user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Invalid password");
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }
});

module.exports = router;
