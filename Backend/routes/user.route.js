import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    blockUser, changePassword, checkOtpForVerification, getCurrentUser,
    loginUser, logoutUser, registerUser,
    sendOtp, updateAccountDetails, updatePersonalDetails, updateUserPhoto
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", upload.single("photo"), registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/getcurrentuser", verifyJWT, getCurrentUser);
router.put("/change-password", verifyJWT, changePassword);
router.put("/update-details", verifyJWT, updatePersonalDetails);
router.post("/update-account", verifyJWT, updateAccountDetails);
router.post("/update-photo", verifyJWT, upload.single("photo"), updateUserPhoto);

router.post("/block-user", blockUser);

router.get('/getOtp', sendOtp)

router.post('/verifyOtp', checkOtpForVerification)

export default router;