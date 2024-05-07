const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Get user ID from request
    const userId = req.user._id;
    // Assuming user ID is available in req.body.userId
    // Convert ObjectId to string

    const userIdString =
      userId instanceof ObjectId ? userId.toHexString() : userId.toString();
    const userFolderPath = path.join("uploads/", userIdString);
    // Create user folder if it doesn't exist
    if (!fs.existsSync(userFolderPath)) {
      await fs.promises.mkdir(userFolderPath, { recursive: true });
    }

    return cb(null, userFolderPath);
  },
  filename: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      return cb(null, `${Date.now().toString()}-${file.originalname}`);
    } else {
      return cb(new Error("Only Pdf Accepted"), false);
    }
  },
});

// error handling
const pdfExcception = (err, req, res, next) => {
  const userInfo = req.user;
  if (err instanceof multer.MulterError) {
    return res.statsu(400).json({ err });
  } else if (err.message === "Only Pdf Accepted") {
    return res.status(400).json({ err: "Only Pdf Accepted" });
  } else {
    return res.statsu(400).json({ err });
  }
};
const upload = multer({ storage: storage });

module.exports = { upload, pdfExcception };
