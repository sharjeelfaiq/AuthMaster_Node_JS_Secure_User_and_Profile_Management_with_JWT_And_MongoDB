import multer from "multer";
import path from "path";
import { verifyToken } from "../services/token.service.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads/";
    if (file.fieldname === "profilePicture") {
      dest += "profilePictures/";
    } else if (file.fieldname === "idImage") {
      dest += "idImages/";
    } else if (file.fieldname === "certificateImage") {
      dest += "certificates/";
    }
    cb(null, dest);
  },
  filename: async function (req, file, cb) {
    const token = req.headers.auth_token;
    const decoded = await verifyToken(token);
    const { _id, firstName } = decoded;
    const userId = _id.slice(-4);

    const fileName = `${userId}-${firstName}-${file.fieldname}-${file.originalname}`;

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

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // limit file size to 1MB
  fileFilter: function (_, file, cb) {
    checkFileType(file, cb);
  },
}).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "idImage", maxCount: 1 },
  { name: "certificateImage", maxCount: 1 },
]);

export default upload;
