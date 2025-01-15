import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    blockUser, changePassword, checkOtpForVerification, getCurrentUser,
    loginUser, logoutUser, registerUser,
    updateAccountDetails, updatePersonalDetails, updateUserPhoto
} from "../controllers/user.controller.js";
import { limiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post("/register",limiter, upload.single("photo"), registerUser);
router.post("/login", limiter, loginUser);
router.post("/logout",  verifyJWT, logoutUser);
router.get("/getcurrentuser", verifyJWT, getCurrentUser);
router.put("/change-password", limiter, verifyJWT, changePassword);
router.put("/update-details", limiter, verifyJWT, updatePersonalDetails);
router.post("/update-account", limiter, verifyJWT, updateAccountDetails);
router.post("/update-photo", limiter, verifyJWT, upload.single("photo"), updateUserPhoto);

router.post("/block-user", blockUser);

// router.get('/getOtp', sendOtp)

router.post('/verifyOtp', upload.single("photo"), checkOtpForVerification)

export default router;
