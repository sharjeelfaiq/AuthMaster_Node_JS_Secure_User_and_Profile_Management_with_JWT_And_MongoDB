import multer from "multer";
import path from "path";
import { verifyToken } from "../services/token.service.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profilePictures");
  },
  filename: async function (req, file, cb) {
    const token = req.headers.auth_token;
    const decoded = await verifyToken(token);
    const userId = decoded._id.slice(-4);
    const fileName = `${userId}-${file.fieldname}-${file.originalname}`;

    cb(null, fileName);
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
