const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
