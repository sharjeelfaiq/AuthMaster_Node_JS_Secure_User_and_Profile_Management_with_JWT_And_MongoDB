import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "../uploads/profilePictures",
  filename: function (req, _res, file, cb) {
    const userId = req.params.userId.slice(-4); // Get the user ID from the request parameters
    cb(null, `${userId}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const uploadProfilePicture = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // limit file size to 1MB
  fileFilter: function (_, file, cb) {
    checkFileType(file, cb);
  },
});

export default uploadProfilePicture;
