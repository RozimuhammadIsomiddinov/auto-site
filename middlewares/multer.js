const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(
      __dirname,
      "..",
      "public/images"
    );
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join(""));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
