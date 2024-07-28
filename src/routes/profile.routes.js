import {
  createOrUpdateProfile,
  getProfile,
} from "../controllers/profile.controller.js";
import { getUserDetails } from "../controllers/userDetails.controller.js";
import upload from "../middlewares/upload.middleware.js";
import csrfProtection from "../middlewares/csrf.middleware.js";

const router = express.Router();
router.use(csrfProtection);

router.get(getProfile).patch(upload, createOrUpdateProfile);

router.get("/get-details", getUserDetails);

export default router;
