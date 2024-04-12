var express = require("express");
var router = express.Router();
const multer = require("multer");
var fs = require("fs-extra");
var journalController = require("../controller/journalController");

// Define the allowed file types
const allowedFileTypes = ["xlsx"];

// Create a function to validate the file type
function fileFilter(req, file, cb) {
  if (allowedFileTypes.includes(file.originalname.split(".")[1])) {
    // Allow the file to be uploaded
    cb(null, true);
  } else {
    // Reject the file and send an error message
    cb(new Error("Invalid file type. Only xlsx files are allowed."));
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var path = `uploads/journal/`;
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0].replace(" ", "-");
    cb(
      null,
      filename + "-" + uniqueSuffix + "." + file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/importSheet", upload.single("file"), journalController.importSheet);

router.get("/getFiles", journalController.getFiles);

router.get("/readFiles/:filename", journalController.readFiles);

router.get('/deleteFile/:filename', journalController.deleteFile);

module.exports = router;
