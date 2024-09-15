const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(
  __dirname,
  "..",
  "..",
  "autoSite",
  "public",
  "images"
);

// Create upload directory if it does not exist
if (!fs.existsSync(uploadDir)) {
  console.log("created");
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(
      __dirname,
      "..",
      "..",
      "autoSite/public/images"
    );
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join(""));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
