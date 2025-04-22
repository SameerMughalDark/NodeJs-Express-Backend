const PORT = 8000;
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
const multer = require("multer");
// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./myUploadedFiles");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer upload instance
const uploadFile = multer({ storage: storage });
app.post("/api/file", uploadFile.single("filek"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    message: "File Uploaded Successfully!",
    fileName: req.file.originalname,
    fileSize: req.file.size, //into kb's
  });
});
app.listen(PORT, () => {
  console.log(
    `Server is Running click here to VISIT the Server-> http://localhost:${PORT}`
  );
});
