const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File upload successful");
  } catch (error) {
    console.log(`Error uploading` + error);
  }
});

module.exports = router;
