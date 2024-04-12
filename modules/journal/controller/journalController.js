const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");

exports.importSheet = async (req, res) => {
  try {
    let file = req.file;
    if (!file) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "file is required",
        status: "fail",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: "File Uploaded Successfully",
      status: "success",
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      err: err,
      message: "Something went wrong",
    });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, "../../../uploads/journal");
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Unable to scan files!",
          err: err.message,
        });
      }
      res.status(StatusCodes.OK).send(files);
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      err: err,
      message: "Something went wrong",
    });
  }
};

exports.readFiles = async (req, res) => {
  try {
    console.log(req.params.filename);
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../../../uploads/journal", filename);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send({
        message: "File not found",
      });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      err: err,
      message: "Something went wrong",
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../../../uploads/journal", filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send({
          message: "Failed to delete the file",
          error: err.message,
        });
      }
      res.send({
        message: "File successfully deleted",
      });
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      err: err,
      message: "Something went wrong",
    });
  }
};
