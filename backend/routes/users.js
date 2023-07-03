const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account updated");
    } catch (err) {
      return res.status(500).json("Error: " + err);
    }
  } else {
    return res.status(403).json("You can only update your account");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account deleted");
    } catch (err) {
      return res.status(500).json("Error: " + err);
    }
  } else {
    return res.status(403).json("You can only delete your account");
  }
});

//get user by id or by usename
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  let user;
  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json("Ungültige Benutzer-ID");
    }
    user = await User.findById(userId);
  } else {
    user = await User.findOne({ username: username });
  }
  if (!user) {
    return res.status(404).json("Benutzer nicht gefunden");
  }
  const { password, updatedAt, ...other } = user._doc;
  res.status(200).json(other);
});

//follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json("Error: " + err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json("Error: " + err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

module.exports = router;
